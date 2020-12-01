import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClaimShopModificationService } from './claim-shop-modification.service';

@NgModule({
    imports: [CommonModule],
    providers: [ClaimShopModificationService],
})
export class ClaimShopModificationModule {}
