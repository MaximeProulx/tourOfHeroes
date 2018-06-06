import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.getUsers();
  }



  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => {
        this.users = users;
        this.messageService.add('Fetched users');
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).then();
    this.messageService.add('Deleted: ' + user.firstName);
  }

}
