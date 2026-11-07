import { Routes } from '@angular/router';
import { LivrePage } from './pages/livre-page/livre-page';

export const routes: Routes = [

    {
        path: 'livre',
        component: LivrePage
    },

    {
        path: '',
        redirectTo: 'livre',
        pathMatch: 'full'
    }

];
