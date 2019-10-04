import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { QuestionaryModule } from './questionary';
import { AggrProxyModule } from './aggr-proxy';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule, QuestionaryModule, AggrProxyModule]
})
export class APICodegenModule {}
