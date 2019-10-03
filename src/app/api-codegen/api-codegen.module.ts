import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { QuestionaryModule } from './questionary';
import { QuestionaryAggrProxyModule } from './questionary-aggr-proxy';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule, QuestionaryModule, QuestionaryAggrProxyModule]
})
export class APICodegenModule {}
