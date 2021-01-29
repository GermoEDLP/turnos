import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Usuarios',
        routerLink: ['/admin','users'],
      },
      {
        label: 'Actividades',
        routerLink: ['/admin', 'activity'],
      },
      {
        label: 'Configuración',
        routerLink: ['/admin','config'],
      },
    ];
  }
}
