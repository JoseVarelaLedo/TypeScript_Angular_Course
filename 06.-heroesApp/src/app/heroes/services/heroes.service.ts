import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(private readonly http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById (id: string): Observable <Hero | undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError( error => of ( undefined ) ) //se usa of porque hay que usar un Observable
      );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  addHero ( hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }
  updateHero ( hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error ('Hero id is required');
    //usamos patch porque put es más 'destructivo'
    //es decir, si mandamos sólo una propiedad
    //de todas las que tiene el objeto, se carga
    //todas aquellas que no enviamos
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id }`, hero);
  }

  deleteHeroById ( id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        catchError ( err => of (false) ),
        map (response => true)
      );
  }
}
