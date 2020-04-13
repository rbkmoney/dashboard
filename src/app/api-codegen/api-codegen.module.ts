import { NgModule } from '@angular/core';

import { AggrProxyModule } from './aggr-proxy';
import { AnapiModule } from './anapi';
import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { DarkApiModule } from './dark-api';
import { MessagesModule } from './messages';
import { QuestionaryModule } from './questionary';

@NgModule({
    imports: [
        CAPIModule,
        ClaimManagementModule,
        QuestionaryModule,
        AnapiModule,
        AggrProxyModule,
        DarkApiModule,
        MessagesModule
    ]
})
export class APICodegenModule {}
