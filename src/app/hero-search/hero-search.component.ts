import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes = [];

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    if (term.length <= 1) {
      this.heroes = [];
    } else {
      this.heroService.getHeroes()
        .then(heroes => this.heroes =
          heroes.filter(hero => hero.alias.indexOf(term) !== -1));
    }
  }

  ngOnInit(): void {
  }
}
