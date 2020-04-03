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

import { ShopService } from '../../../api/shop';
import { WebhooksModule as ApiWebhooksModule } from '../../../api/webhooks';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhookCardModule } from './webhook-card/webhook-card.module';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [
        WebhooksRoutingModule,
        ApiWebhooksModule,
        ButtonModule,
        MatDialogModule,
        WebhookCardModule,
        CommonModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        TranslocoModule
    ],
    declarations: [WebhooksComponent, CreateWebhookComponent],
    entryComponents: [CreateWebhookComponent],
    providers: [ReceiveWebhooksService, ShopService]
})
export class WebhooksModule {}
