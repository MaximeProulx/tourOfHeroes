import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() loggedUser: User;
  password: string;
  newPassword: string;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private messageService: MessageService
    ) {}

  ngOnInit() {
    this.password = null;
    this.newPassword = null;
    this.getUser();
  }

  public getUser() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser')) as User;
    this.userService.getUser(this.route.snapshot.paramMap.get('_id'))
    .then(user => {this.user = user;
      this.messageService.add('Fetched user');
    });
  }

  save(): void {
    if (this.password !== null && this.newPassword !== null) {
      if (this.password === this.user.password && this.newPassword !== this.user.password) {
        this.user.password = this.newPassword;
        this.userService.updateUser(this.user);
        this.newPassword = null;
        this.password = null;
        this.messageService.add('Updated: ' + this.user.firstName);
        localStorage.setItem('currentUser', JSON.stringify(this.user));

      }
    } else if (this.password === null && this.newPassword === null) {
      this.userService.updateUser(this.user);
      this.messageService.add('Updated: ' + this.user.firstName);
      localStorage.setItem('currentUser', JSON.stringify(this.user));

    }
  }
  goBack(): void {
    this.location.back();
  }
}

