import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import {set as setCookie, get as getCookie} from 'es-cookie';
import * as Cookies from 'es-cookie';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() user: User;

  constructor(private router: Router, private userService: UserService, private messageService: MessageService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  this.getUser();
  }

  public getUser() {
        this.user = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  logout() {
   this.authenticationService.logout();
   this.user = null;
  }

}
