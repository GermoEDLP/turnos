import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  get emailInvalid(){
    return true;
  }

  get passInvalid(){
    return true;
  }

  createForm(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      born: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      pass2: ['', [Validators.required]]
    })
  }

  check(){

  }

  singInPage(){

  }

}
