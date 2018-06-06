import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  password: string;
  newPassword: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private messageService: MessageService
    ) {}

  ngOnInit() {
    this.password = null;
    this.newPassword = null;
  }



  save(): void {
    if (this.password !== null && this.newPassword !== null) {
      if (this.password === this.newPassword) {
        this.user.email = this.email;
        this.user.password = this.newPassword;
        this.user.firstName = this.firstName;
        this.user.lastName = this.lastName;
        this.user.role = 2;

        this.userService.addUser(this.user);
      }
    }
  }
  goBack(): void {
    this.location.back();
  }
}
