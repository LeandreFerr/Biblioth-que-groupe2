import { Routes } from '@angular/router';
import { EditeurPage } from './page/editeur-page/editeur-page';

export const routes: Routes = [

    // Page Editeurs
  {
    path: 'editeur',
    component: EditeurPage,
   // canActivate: [ authGuard ]
  },

];
