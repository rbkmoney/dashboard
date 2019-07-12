import { Routes } from '@angular/router';

import { ClaimComponent } from './claim';

export const routes: Routes = [
    {
        path: 'claim/:id',
        component: ClaimComponent
    }
];
