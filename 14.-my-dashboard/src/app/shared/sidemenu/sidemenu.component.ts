import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidemenu',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {
  public menuItems = routes
    .map ( route => route.children ?? [] )
    .flat ()
    .filter ( route => route && route.path ) //excluimos la ruta comodín vacío ''
    .filter ( route => !route.path?.includes (':') ) //excluimos la ruta user/:id

      // constructor () {
  //   const dashboardRoutes = routes
  //     .map ( route => route.children ?? [] )
  //     .flat ()
  //     .filter ( route => route && route.path ) //excluimos la ruta comodín vacío ''
  //     .filter ( route => !route.path?.includes (':') ) //excluimos la ruta user/:id
  // }

}
