import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { WebhooksModule as ApiWebhooksModule } from '@dsh/api/webhooks';
import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { ConfirmActionDialogModule } from '@dsh/components/popups';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { CreateWebhookModule } from './create-webhook/';
import { WebhookListModule } from './webhook-list';
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
        SpinnerModule,
        EmptySearchResultModule,
        ShowMorePanelModule,
        ConfirmActionDialogModule,
        MatDividerModule,
        CreateWebhookModule,
        WebhookListModule,
    ],
    declarations: [WebhooksComponent],
})
export class WebhooksModule {}
