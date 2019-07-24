import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { ConversationComponent } from './conversation';
import { DocumentsComponent } from './documents';
import { ChangesComponent } from './changes';

const claimRoutes: Routes = [
    {
        path: '',
        component: ClaimComponent,
        children: [
            {
                path: 'conversation',
                component: ConversationComponent
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
