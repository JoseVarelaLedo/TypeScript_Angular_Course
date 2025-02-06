import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,

  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit{
  private readonly usersService = inject(UsersServiceService);
  public userId = signal (1);

  public currentUser = signal<User|undefined> (undefined);
  public userWasFound = signal(true); //iniciamos a true en la confianza de recibir siempre usuario
  public fullName = computed<string> ( () => { //propiedad computada para conctenar nombre y apellidos
    if (!this.currentUser) return 'Usuario no encontrado';
    return `${ this.currentUser()?.first_name}  ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser (id:number): void {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined); //para simular la transición de carga entre usuarios
    this.usersService.getUserById(id)
      .subscribe( {
        next: (user) => { //caso si se completa adecuadamente
          this.currentUser.set (user);
          this.userWasFound.set(true);
        },
        error: () =>{       //manejo del error
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        }
      });
  }
}
