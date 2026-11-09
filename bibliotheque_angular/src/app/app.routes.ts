import { Routes } from '@angular/router';
import { CollectionComponent } from './pages/collection/collection';
import { LivrePage } from './pages/livre-page/livre-page';
import { AuteurPage } from './pages/auteur-page/auteur-page';
import { EditeurPage } from './pages/editeur-page/editeur-page';
import { AvisPage } from './pages/avis-page/avis-page';
import { LoginPage } from './pages/login-page/login-page';
import { GenrePage } from './pages/genre-page/genre-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'livre',
    component: LivrePage,
    canActivate: [authGuard],
  },
  {
    path: 'auteur',
    component: AuteurPage,
    canActivate: [authGuard],
  },
  {
    path: 'editeur',
    component: EditeurPage,
    canActivate: [authGuard],
  },
  {
    path: 'collection',
    component: CollectionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'avis',
    component: AvisPage,
    canActivate: [authGuard],
  },
  {
    path: 'genres',
    component: GenrePage,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'livre',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'livre',
  },
];
