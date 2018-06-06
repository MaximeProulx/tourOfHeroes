import { Injectable, Input } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';


@Injectable()
export class AuthGuard implements CanActivate {
  @Input() user: User;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.user = JSON.parse(localStorage.getItem('currentUser')) as User;

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        } else {
          // not logged in so redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
    }
}
