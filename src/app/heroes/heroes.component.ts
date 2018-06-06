import { Component, OnInit } from '@angular/core';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .then(heroes => {
        this.heroes = heroes;
        this.messageService.add('Fetched heroes');
      });
  }

  add(alias: string): void {
    alias = alias.trim();
    if (!alias) { return; }
    this.heroService.addHero({ alias } as Hero)
      .then(hero => {
        this.heroes.push(hero);

       this.messageService.add('Added: ' + hero.alias);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).then();
    this.messageService.add('Deleted: ' + hero.alias);
  }

}
