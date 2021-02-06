import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { BlocksComponent } from './pages/blocks/blocks.component';
import { ConfigComponent } from './pages/config/config.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'blocks', component: BlocksComponent },
      { path: '**', redirectTo: 'users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
