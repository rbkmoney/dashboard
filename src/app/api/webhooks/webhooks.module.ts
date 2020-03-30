import { NgModule } from '@angular/core';

import { WebhooksService } from './webhooks.service';

@NgModule({
    // imports: [CAPIModule],
    providers: [WebhooksService]
})
export class WebhooksModule {}
