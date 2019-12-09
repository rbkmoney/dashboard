import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { DocumentsComponent } from './documents';
import { ChangesComponent } from './changes';

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
                component: DocumentsComponent
            },
            {
                path: 'changes',
                component: ChangesComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(claimRoutes)],
    exports: [RouterModule]
})
export class ClaimRoutingModule {}
