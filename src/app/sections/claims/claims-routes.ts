import { Routes } from '@angular/router';

import { DetailsComponent } from './details';
import { ClaimComponent } from './claims.component';

export const routes: Routes = [
    {
        path: 'claim',
        component: ClaimComponent
    },
    {
        path: 'claim/:id/details',
        component: DetailsComponent
    }
];
