import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClaimContractModificationModule } from './claim-contract-modification';
import { ClaimContractorModificationModule } from './claim-contractor-modification/claim-contractor-modification.module';
import { ClaimShopModificationModule } from './claim-shop-modification/claim-shop-modification.module';

const modules = [ClaimContractModificationModule, ClaimContractorModificationModule, ClaimShopModificationModule];

@NgModule({
    imports: [CommonModule, ...modules],
    exports: [...modules],
})
export class ClaimPartyModificationModule {}
