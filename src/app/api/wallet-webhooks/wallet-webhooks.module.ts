import { NgModule } from '@angular/core';

import { CapiModule } from '../capi';
import { WalletWebhooksService } from './wallet-webhooks.service';

@NgModule({
    imports: [CapiModule],
    providers: [WalletWebhooksService],
})
export class WalletWebhooksModule {}
