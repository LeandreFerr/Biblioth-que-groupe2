import { Routes } from '@angular/router';
import { GenrePage } from './page/genre-page/genre-page';
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


    {
        path: 'genres',
        component: GenrePage
    }

];
