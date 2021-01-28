import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterInputComponent } from './register-input/register-input.component';

const comp = [RegisterInputComponent]

@NgModule({
  declarations: comp,
  imports: [
    CommonModule
  ],
  exports: comp
})
export class AuthComponentsModule { }
