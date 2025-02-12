import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    //guards
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import ('./auth/auth.module').then ( module => module.AuthModule)
  },
  {
    path: 'dashboard',
    //guards
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import ('./dashboard/dashboard.module').then ( module => module.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
