import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private readonly http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    //NOVEDAD!!! crea un Deep Clone del usuario
    return structuredClone( this.user );
  }

  login (email: string, password: string): Observable<User>{
    // http.post ('login', {enail, password});

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => { this.user = user } ),
        tap( user => localStorage.setItem( 'token', user.id.toString() ) )
      );
  }

  checkAuthentication(): Observable<boolean> {
    if ( !localStorage.getItem('token')) return of( false );
    const token = localStorage.getItem ('item');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user=> this.user = user),
        //doble negación, para que devolvamos true si hay usuario
        //con la doble negación convertimos cualquier variable en un booleano true
        map( user => !!user ),
        catchError (err => of (false))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
