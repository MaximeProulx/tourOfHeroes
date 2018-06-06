import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from '../models/user';
import { MessageService } from './message.service';
import { Http , Headers } from '@angular/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private messageService: MessageService, public http: Http, private router: Router) { }


  login(email: string, password: string): Promise<User> {
    return this.http
    .post('/api/user/login/', {email: email, password: password}, {headers: this.headers})
    .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  getUser(_id: string): Promise<User> {
    return this.http
    .post('/api/user/getUser/', {_id: _id}, {headers: this.headers})
    .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http.get('/api/user/getUsers')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    return this.http
      .put('/api/user/updateUser/' + user._id, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      // tslint:disable-next-line:no-shadowed-variable
      .then((user) => user.json() as User)
      .catch(this.handleError);
  }
  addUser(user: User): Promise<User> {
    return this.http
      .post('/api/user/addUser', JSON.stringify(user), {headers: this.headers})
      .toPromise()
      // tslint:disable-next-line:no-shadowed-variable
      .then((user) => {  this.messageService.add('Registered you can log in');
      this.router.navigate(['login']);

    })
      .catch(this.handleError);

  }

  deleteUser(user: User) {
    return this.http
      .delete('/api/user/deleteUser/' + user._id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

   private handleError(error: any): Promise<any> {
    this.messageService.add('An error occurred');
    return Promise.reject(error.message || error);
  }
}
