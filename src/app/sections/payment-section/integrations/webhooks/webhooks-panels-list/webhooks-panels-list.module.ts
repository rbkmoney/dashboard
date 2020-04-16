import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { ExpandPanelModule } from '@dsh/components/layout';

import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { KeyComponent } from './key/key.component';
import { WebhooksPanelsListComponent } from './webhooks-panels-list.component';

@NgModule({
    declarations: [WebhooksPanelsListComponent, DetailsComponent, EventsComponent, KeyComponent, ActionsComponent],
    imports: [
        ButtonModule,
        ClipboardModule,
        ExpandPanelModule,
        FlexModule,
        TranslocoModule,
        MatDividerModule,
        CommonModule
    ],
    exports: [WebhooksPanelsListComponent]
})
export class WebhooksPanelsListModule {}
