import { Routes } from '@angular/router';
import { CollectionComponent } from './page/collection/collection';
import { LivrePage } from './pages/livre-page/livre-page';
import { AuteurPage } from './pages/auteur-page/auteur-page';


export const routes: Routes = [

    {
      path: 'collection',
      component: CollectionComponent,
    },
    {
      path: 'livre',
      component: LivrePage,
    },
    {
      path: 'auteur',
      component: AuteurPage
    },

    {
      path: '',
      redirectTo: 'collection',
      pathMatch: 'full',
    },
    {
      path: '',
      redirectTo: 'livre',
      pathMatch: 'full',
    },
    {
      path: '',
      redirectTo: 'auteur',
      pathMatch: 'full',

    }

];

