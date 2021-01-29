//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos propios
import { AdminComponentsModule } from './components/components.module';

//Modulos externos

//Componentes
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ConfigComponent } from './pages/config/config.component';

//Otros
import { AdminRoutingModule } from './admin-routing.module';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { OrderListModule } from 'primeng/orderlist';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ActivityComponent,
    ConfigComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminComponentsModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    OrderListModule,
    DialogModule,
    ToastModule,
    ChipModule,
    CardModule,
    TableModule,
    InputTextModule,
    RatingModule,
    ConfirmDialogModule,

  ],
})
export class AdminModule {}
