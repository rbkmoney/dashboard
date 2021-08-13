import { NgModule } from '@angular/core';

import { ContractsModule } from '@dsh/api';

import { ShopContractDetailsService } from './shop-contract-details.service';

@NgModule({
    imports: [ContractsModule],
    providers: [ShopContractDetailsService],
})
export class ShopContractDetailsModule {}
