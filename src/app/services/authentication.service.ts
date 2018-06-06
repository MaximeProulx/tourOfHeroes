import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { MessageService } from '../services/message.service';



@Injectable()
export class AuthenticationService {
  localUser: any = {};

    constructor(private router: Router, private http: HttpClient, private messageService: MessageService) { }

    login(email: string, password: string) {
        return this.http.post<any>('/api/user/login/', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.localUser.firstName = user.firstName;
                    this.localUser.lastName = user.lastName;
                    this.localUser.token = user.token;
                    this.localUser.role = user.role;
                    this.localUser._id = user._id;

                    localStorage.setItem('currentUser', JSON.stringify(this.localUser));
                 } else {
                  this.messageService.add('Login failed');
                }

                return user;
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
        this.messageService.clear();
    }

    getToken() {
              const currentUser = JSON.parse(localStorage.getItem('currentUser'));
              return currentUser.token;
    }
}
