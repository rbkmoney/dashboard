import { NgModule } from '@angular/core';

import { CapiModule } from '../capi';
import { WebhooksService } from './webhooks.service';

@NgModule({
    imports: [CapiModule],
    providers: [WebhooksService],
})
export class WebhooksModule {}
