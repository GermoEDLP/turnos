//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos propios
import { AdminComponentsModule } from './components/components.module'

//Modulos externos

//Componentes
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { ActivityComponent } from './pages/activity/activity.component';

//Otros
import { AdminRoutingModule } from './admin-routing.module';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import {OrderListModule} from 'primeng/orderlist';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { ChipModule } from 'primeng/chip';



@NgModule({
  declarations: [AdminComponent, UsersComponent, ActivityComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminComponentsModule,
    ButtonModule,
    MenubarModule,
    OrderListModule,
    DialogModule,
    ToastModule,
    ChipModule
  ],
})
export class AdminModule {}
