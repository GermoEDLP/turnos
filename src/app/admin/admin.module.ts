//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos propios

//Modulos externos

//Componentes
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './admin.component';

//Otros
import { AdminRoutingModule } from './admin-routing.module';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [AdminComponent, UsersComponent],
  imports: [CommonModule, AdminRoutingModule, ButtonModule,MenubarModule],
})
export class AdminModule {}
