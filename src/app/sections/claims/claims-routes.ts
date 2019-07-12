import { Routes } from '@angular/router';

import { ClaimComponent } from './claim';
import { ClaimsComponent } from './claims.component';

export const routes: Routes = [
    {
        path: 'claim',
        component: ClaimsComponent
    },
    {
        path: 'claim/:id',
        component: ClaimComponent
    }
];
