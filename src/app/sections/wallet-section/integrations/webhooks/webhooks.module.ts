import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';

import { IdentityModule, WalletWebhooksModule } from '../../../../api';
import { WebhooksModule as ApiWebhooksModule } from '../../../../api/webhooks';
import { CreateWebhookModule } from './create-webhook';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhookListModule } from './webhook-list';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [
        WebhooksRoutingModule,
        ApiWebhooksModule,
        ButtonModule,
        CommonModule,
        FlexModule,
        TranslocoModule,
        SpinnerModule,
        WebhookListModule,
        EmptySearchResultModule,
        WalletWebhooksModule,
        IdentityModule,
        CreateWebhookModule,
    ],
    declarations: [WebhooksComponent],
    providers: [ReceiveWebhooksService],
})
export class WebhooksModule {}
