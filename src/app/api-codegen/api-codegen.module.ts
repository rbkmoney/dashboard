import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { QuestionaryModule } from './questionary';
import { AnapiModule } from './anapi';
import { AggrProxyModule } from './aggr-proxy';
import { DarkApiModule } from './dark-api';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule, QuestionaryModule, AnapiModule, AggrProxyModule, DarkApiModule]
})
export class APICodegenModule {}
