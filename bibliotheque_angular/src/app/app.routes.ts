import { Routes } from '@angular/router';

import { LoginPage } from './pages/login-page/login-page';
import { GenrePage } from './pages/genre-page/genre-page';
import { LivrePage } from './pages/livre-page/livre-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginPage
  },

  {
    path: 'livre',
    component: LivrePage,
    canActivate: [authGuard]
  },

  {
    path: 'genres',
    component: GenrePage,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'livre',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'livre'
  }

];