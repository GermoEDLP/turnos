import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private adminSvc: AdminService) { }

  ngOnInit(): void {
    this.adminSvc.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(users);

    })
  }

}
