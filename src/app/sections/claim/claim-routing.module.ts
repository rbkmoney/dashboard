import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { ConversationComponent } from './conversation';
import { DocumentsComponent } from './documents';
import { ChangesComponent } from './changes';

@NgModule({
    imports: [
        RouterModule.forChild([
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
        ])
    ],
    exports: [RouterModule]
})
export class ClaimRoutingModule {}
