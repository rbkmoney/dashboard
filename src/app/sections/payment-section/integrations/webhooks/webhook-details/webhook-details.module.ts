import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { WebhookApiKeyModule } from '@dsh/app/shared/components';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { WebhookActionsComponent } from './webhook-actions';
import { WebhookDetailsComponent } from './webhook-details.component';
import { WebhookEventsComponent } from './webhook-events';
import { WebhookMainInfoComponent } from './webhook-main-info';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        IndicatorsModule,
        ApiModelRefsModule,
        ClipboardModule,
        WebhookApiKeyModule,
    ],
    declarations: [WebhookDetailsComponent, WebhookMainInfoComponent, WebhookActionsComponent, WebhookEventsComponent],
    exports: [WebhookDetailsComponent],
})
export class WebhookDetailsModule {}
