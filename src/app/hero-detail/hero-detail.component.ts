import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location,
  private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const _id = this.route.snapshot.paramMap.get('_id');

    this.heroService.getHero(_id)
      .then(hero => {this.hero = hero;
       this.messageService.add('Fetched: ' + hero.alias);
      });

  }

 save(): void {
    this.heroService.updateHero(this.hero);
    this.messageService.add('Updated: ' + this.hero.alias);

  }

  goBack(): void {
    this.location.back();
  }
}

