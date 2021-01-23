import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageSimple } from 'src/app/interfaces/misc.interaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  msg: MessageSimple = {
    state: false,
  };
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  get nameInvalid() {
    return (
      this.registerForm.get('name').invalid &&
      this.registerForm.get('name').touched
    );
  }

  get surnameInvalid() {
    return (
      this.registerForm.get('surname').invalid &&
      this.registerForm.get('surname').touched
    );
  }

  get bornInvalid() {
    return (
      this.registerForm.get('born').invalid &&
      this.registerForm.get('born').touched
    );
  }

  get emailInvalid() {
    return (
      this.registerForm.get('email').invalid &&
      this.registerForm.get('email').touched
    );
  }

  get passInvalid() {
    return (
      this.registerForm.get('pass').invalid &&
      this.registerForm.get('pass').touched
    );
  }

  get pass2Invalid() {
    return (
      this.registerForm.get('pass').value !==
        this.registerForm.get('pass2').value &&
      this.registerForm.get('name').touched
    );
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      born: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      pass2: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  check() {
    this.msg.state = false;
    if (this.registerForm.valid) {
      let user = { ...this.registerForm.value };
      delete user.pass;
      delete user.pass2;
      this.authSvc
        .signUp(user, this.registerForm.get('pass').value)
        .then((userCred)=>{
          this.msg = {
            state: true,
            severity: 'success',
            text: 'La cuenta ha sido creada correctamente, dirijase a la página de inicio para abrir sesión.'
          }
        })
        .catch((e) => {
          if(e.code=="auth/email-already-in-use"){
            this.msg = {
              state: true,
              severity: 'error',
              text: 'El mail especificado ya esta siendo usado'
            }
          }else{
            this.msg = {
              state: true,
              severity: 'error',
              text: 'Ocurrio un error con la creación de usuario, por favor intentelo nuevamente'
            }
          }
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  singInPage() {
    this.router.navigateByUrl('/auth/login');
  }
}
