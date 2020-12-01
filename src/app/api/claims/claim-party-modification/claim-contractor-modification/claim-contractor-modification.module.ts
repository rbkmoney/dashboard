import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClaimContractorModificationService } from './claim-contractor-modification.service';

@NgModule({
    imports: [CommonModule],
    providers: [ClaimContractorModificationService],
})
export class ClaimContractorModificationModule {}
