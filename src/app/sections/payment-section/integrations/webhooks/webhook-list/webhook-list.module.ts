import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule } from '@dsh/app/shared/*';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DeleteWebhookModule } from '../delete-webhook';
import { WebhookDetailsModule } from '../webhook-details';
import { WebhookListComponent } from './webhook-list.component';
import { WebhookRowComponent } from './webhook-row';
import { WebhookRowHeaderComponent } from './webhook-row-header';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        WebhookDetailsModule,
        DeleteWebhookModule,
        ApiModelRefsModule,
    ],
    declarations: [WebhookListComponent, WebhookRowHeaderComponent, WebhookRowComponent],
    exports: [WebhookListComponent],
})
export class WebhookListModule {}
