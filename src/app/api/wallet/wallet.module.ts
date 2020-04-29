import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { WalletModule as ApiWalletModule } from '../../api-codegen/wallet-api/wallet.module';
import { WalletService } from './wallet.service';

@NgModule({
    imports: [ApiWalletModule, MatSnackBarModule, TranslocoModule],
    providers: [WalletService]
})
export class WalletModule {}
