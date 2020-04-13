import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ShopService } from '../../../../api/shop';
import { WebhooksModule as ApiWebhooksModule } from '../../../../api/webhooks';
import { CreateWebhookService } from './create-webhook.service';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhookPanelModule } from './webhook-panel/webhook-panel.module';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [
        WebhooksRoutingModule,
        ApiWebhooksModule,
        ButtonModule,
        MatDialogModule,
        CommonModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        TranslocoModule,
        WebhookPanelModule,
        SpinnerModule,
        EmptySearchResultModule,
        CardModule,
        ShowMorePanelModule
    ],
    declarations: [WebhooksComponent, CreateWebhookComponent],
    entryComponents: [CreateWebhookComponent],
    providers: [ReceiveWebhooksService, CreateWebhookService, ShopService]
})
export class WebhooksModule {}
