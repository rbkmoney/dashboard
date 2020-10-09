import { NgModule } from '@angular/core';

import { CAPIModule } from '../capi';
import { WalletWebhooksService } from './wallet-webhooks.service';

@NgModule({
    imports: [CAPIModule],
    providers: [WalletWebhooksService],
})
export class WalletWebhooksModule {}
