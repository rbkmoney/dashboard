import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { QuestionaryModule } from './questionary';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule, QuestionaryModule]
})
export class APICodegenModule {}
