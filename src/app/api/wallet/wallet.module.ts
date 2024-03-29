import { NgModule } from '@angular/core';

import { WalletModule as ApiWalletModule } from '@dsh/api-codegen/wallet-api/wallet.module';

import { WalletService } from './wallet.service';

@NgModule({
    imports: [ApiWalletModule],
    providers: [WalletService],
})
export class WalletModule {}
