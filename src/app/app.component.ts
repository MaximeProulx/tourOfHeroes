import { Component, Input } from '@angular/core';
import { User } from './models/user';
import * as Cookies from 'es-cookie';


import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() user: User;

  title = 'Tour of Heroes';
  constructor(private router: Router) {
  }
}
