import { NgModule } from '@angular/core';

import { CAPIModule } from './capi';
import { ClaimManagementModule } from './claim-management';

@NgModule({
    imports: [CAPIModule, ClaimManagementModule]
})
export class APICodegenModule {}
