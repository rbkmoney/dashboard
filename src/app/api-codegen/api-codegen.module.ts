import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { QuestionaryModule } from './questionary';
import { AnapiModule } from './anapi';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule, QuestionaryModule, AnapiModule]
})
export class APICodegenModule {}
