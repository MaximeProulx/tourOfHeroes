import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from '../models/hero';
import { MessageService } from './message.service';
import { Http , Headers } from '@angular/http';


@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private messageService: MessageService, public http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get('/api/hero/getHeroes')
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }
  getHero(id: string): Promise<Hero> {
    return this.http.get(`/api/hero/getHero/${id}`)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }
  updateHero(hero: Hero): Promise<Hero> {
    return this.http
      .put('/api/hero/updateHero/' + hero._id, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      // tslint:disable-next-line:no-shadowed-variable
      .then((hero) => hero.json() as Hero)
      .catch(this.handleError);
  }

  addHero(hero: Hero) {
    return this.http
      .post('/api/hero/addHero', JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json() as Hero;
      })
      .catch(this.handleError);
  }


  deleteHero(hero: Hero) {
    return this.http
      .delete('/api/hero/deleteHero/' + hero._id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }




   private handleError(error: any): Promise<any> {
    this.messageService.add('An error occurred');
    return Promise.reject(error.message || error);
  }
}
