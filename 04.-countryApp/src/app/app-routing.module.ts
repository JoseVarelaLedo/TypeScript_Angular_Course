import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { CountriesModule } from './countries/countries.module';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import ('./countries/countries.module') //es una promesa
      .then (module => module.CountriesModule)
  },
  {
    path: '**', //cualquier ruta no conocida se redirige a home
    redirectTo: 'countries'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ), //si es el primer router hay que poner el forRoot
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
