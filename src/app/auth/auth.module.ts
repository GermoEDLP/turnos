//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos propios
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponentsModule } from './components/components.module'

//Modulos externos
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

//Componentes
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Otros

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AuthComponentsModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    MessageModule,
  ],
})
export class AuthModule {}
