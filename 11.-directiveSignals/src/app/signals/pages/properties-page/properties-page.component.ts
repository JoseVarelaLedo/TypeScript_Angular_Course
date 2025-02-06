import { Component, computed, effect, OnDestroy, signal, OnInit } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,

  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit, OnDestroy{

  public counter = signal(666);

  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  public fullName = computed<string> ( () => { //propiedad computada para conctenar nombre y apellidos
      if (!this.user) return 'Usuario no encontrado';
      return `${ this.user()?.first_name}  ${this.user()?.last_name}`;
    });

    public userChangedEffect = effect(() =>{    //uso de efectos, que actúan como disparadores
      console.log (`${this.user().first_name} - ${this.counter()}`);
    });

    ngOnInit(): void {
      setInterval(() => {
        this.counter.update( currentValue => currentValue +1)
      }, 1000);
    }

    ngOnDestroy(): void {
      this.userChangedEffect.destroy();
    }

  onFieldUpdated( field: keyof User, value: string) {  //usando keyof validamos que sea un campo de User y prevenimos el envío de campos incorrectos
    this.user.update( currentUser => {
      switch ( field ){
        case 'email':
          currentUser.email = value;
          break;
        case 'avatar':
          currentUser.avatar = value;
          break;
        case 'first_name':
          currentUser.first_name = value;
          break;
        case 'last_name':
          currentUser.last_name = value;
          break;
        case 'id':
          currentUser.id = Number(value);
          break;
      }
      return currentUser;
    });
  }

  increaseBy ( value: number): void{
    this.counter.update( currentValue => currentValue + value);
  }
}
