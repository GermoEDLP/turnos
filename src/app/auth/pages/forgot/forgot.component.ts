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
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  email: FormGroup;
  msg: MessageSimple = {
    severity: '',
    text: '',
    state: false
  }

  get emailInvalid() {
    return this.email.get('email').invalid && this.email.get('email').touched;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.email = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  check() {
    this.msg.state = false;
    if (this.email.valid) {
      this.authSvc
        .forgotPass(this.email.get('email').value)
        .then(()=>{
          this.msg.state = true;
          this.msg.severity = 'success';
          this.msg.text =
            'Se ha enviado un link de cambio de contraseña a la cuenta especificada.';
        })
        .catch((e) => {
          this.msg.state = true;
          this.msg.severity = 'error';
          this.msg.text =
            'Ocurrio un error con el mail especificado, por favor ingreselo nuevamente.';
        });
    } else {
      this.email.markAllAsTouched();
    }
  }
  singInPage() {
    this.router.navigateByUrl('/auth/login');
  }
}
