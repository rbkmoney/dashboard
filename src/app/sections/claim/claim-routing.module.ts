import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimComponent } from './claim.component';

const claimRoutes: Routes = [
    {
        path: ':claimId',
        component: ClaimComponent,
        children: [
            {
                path: 'conversation',
                loadChildren: () => import('./conversation/conversation.module').then(mod => mod.ConversationModule)
            },
            {
                path: 'documents',
                loadChildren: () => import('./documents/documents.module').then(mod => mod.DocumentsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(claimRoutes)],
    exports: [RouterModule]
})
export class ClaimRoutingModule {}
