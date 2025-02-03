import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{
  constructor( private readonly authService: AuthService, private readonly router: Router) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['/']);
          }
        }),
        //necesario si se cierra sesión, para que no dé fallo
        map ( isAuthenticated => !isAuthenticated)
      );
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>  {
    return this.checkAuthStatus();
  }
}
