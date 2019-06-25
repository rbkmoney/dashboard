import { Routes } from '@angular/router';

import { DetailsComponent } from './details';
import { ClaimComponent } from './claim.component';

export const routes: Routes = [
    {
        path: 'claim',
        component: ClaimComponent
    },
    {
        path: 'claim/details',
        component: DetailsComponent
    }
];
