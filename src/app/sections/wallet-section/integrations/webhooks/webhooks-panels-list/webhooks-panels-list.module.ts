import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule, ExpandPanelModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ActionsComponent } from './actions';
import { DetailsComponent } from './details';
import { EventsComponent } from './events';
import { KeyComponent } from './key';
import { WebhooksPanelsListComponent } from './webhooks-panels-list.component';

@NgModule({
    declarations: [WebhooksPanelsListComponent, DetailsComponent, EventsComponent, KeyComponent, ActionsComponent],
    imports: [
        TranslocoModule,
        ExpandPanelModule,
        FlexModule,
        CommonModule,
        MatIconModule,
        MatDividerModule,
        ButtonModule,
        ClipboardModule,
        DetailsItemModule,
        ShowMorePanelModule,
    ],
    exports: [WebhooksPanelsListComponent],
})
export class WebhooksPanelsListModule {}
