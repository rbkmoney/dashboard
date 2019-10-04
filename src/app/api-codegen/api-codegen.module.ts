import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';
import { QuestionaryModule } from './questionary';
import { AapiModule } from './aapi';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule, QuestionaryModule, AapiModule]
})
export class APICodegenModule {}
