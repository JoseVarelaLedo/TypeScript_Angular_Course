import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor (
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router  ){  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      delay (1500),
      //con switchMap de RxJS obtenemos los params , y desestructuramos la id de ellos,
      //para usarla como argumento a la hora de llamar al método del servicio
      switchMap ( ( { id } ) => this.heroesService.getHeroById( id ) )
    ).subscribe( hero => {
      if ( !hero ) return this.router.navigate (['/heroes/list']);
      //en el caso de que sí obtengamos
      this.hero = hero;
      return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl( 'heroes/list' );
  }
}
