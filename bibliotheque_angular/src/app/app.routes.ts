import { Routes } from '@angular/router';
import { CollectionComponent } from './page/collection/collection';
import { LivrePage } from './pages/livre-page/livre-page';
import { AuteurPage } from './pages/auteur-page/auteur-page';
import { EditeurPage } from './page/editeur-page/editeur-page';
import { AvisPage } from './pages/avis-page/avis-page';

export const routes: Routes = [
  {
    path: 'livre',
    component: LivrePage,
  },
  {
    path: 'auteur',
    component: AuteurPage,
  },
  {
    path: 'editeur',
    component: EditeurPage,
  },
  {
    path: 'collection',
    component: CollectionComponent,
  },
  {
    path: 'avis',
    component: AvisPage,
  },
  {
    path: '',
    redirectTo: 'livre',
    pathMatch: 'full',
  },
];
