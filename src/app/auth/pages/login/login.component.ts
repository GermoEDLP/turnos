import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  pass: string;
  error: string;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formsCreate();
  }

  formsCreate() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get emailInvalid() {
    return (
      this.loginForm.get('email').touched && this.loginForm.get('email').invalid
    );
  }

  get passInvalid() {
    return (
      this.loginForm.get('pass').touched && this.loginForm.get('pass').invalid
    );
  }

  check() {
    if (this.loginForm.valid) {
      this.authSvc
        .logIn(this.loginForm.value.email, this.loginForm.value.pass)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          if(error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password'){
            this.error = 'La contraseña o el email no son correctos';
          }else if (error.code == 'auth/user-disabled'){
            this.error = 'La cuenta a la que quiere ingresar se encuentra deshabilitada';
          }
          this.loginForm.reset();
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  singUpPage() {
    this.router.navigateByUrl('/auth/register');
  }
}
