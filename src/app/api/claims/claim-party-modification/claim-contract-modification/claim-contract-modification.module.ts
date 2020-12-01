import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClaimContractModificationService } from './claim-contract-modification.service';

@NgModule({
    imports: [CommonModule],
    providers: [ClaimContractModificationService],
})
export class ClaimContractModificationModule {}
