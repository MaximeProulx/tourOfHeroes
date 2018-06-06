import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

import {set as setCookie, get as getCookie} from 'es-cookie';
import * as Cookies from 'es-cookie';
import JWTManager from 'jwt-manager';



@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() user: User;
  model: any = {};
    loading = false;
    returnUrl: string;
  email: string;
  password: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, private messageService: MessageService) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.email, this.password)
    .subscribe(
      data => {
        this.router.navigate(['menu']);
          this.router.navigate(['dashboard']);
      },
      error => {
        this.messageService.add('Login failed');
      });
  }
  register() {
    this.router.navigate(['register']);
  }
}
