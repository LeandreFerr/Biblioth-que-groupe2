import { Routes } from '@angular/router';
import { CollectionComponent } from './page/collection/collection';

export const routes: Routes = [
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: '',
    redirectTo: 'collection',
    pathMatch: 'full'
  }
];