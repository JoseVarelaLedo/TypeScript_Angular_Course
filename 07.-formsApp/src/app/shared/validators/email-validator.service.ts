
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null> ( (subscriber) => {
      console.log (email);

      if ( email === 'jose@jose.com'){
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000) //ponemos un delay para ver el efecto, si no es demasiado rápido y no vemos el paso de pending a invalid o valid
    );

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log (email);

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   )
  // }
}
