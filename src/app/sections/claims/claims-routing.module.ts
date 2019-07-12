import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimComponent } from './claim';
import { ConversationComponent } from './claim/conversation';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claim/:id',
                component: ClaimComponent,
                children: [
                    {
                        path: '',
                        component: ConversationComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ClaimsRoutingModule {}
