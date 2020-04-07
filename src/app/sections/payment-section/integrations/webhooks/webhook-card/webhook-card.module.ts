import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { KeyComponent } from './key/key.component';
import { WebhookCardComponent } from './webhook-card.component';

@NgModule({
    imports: [
        ClipboardModule,
        LayoutModule,
        CommonModule,
        ButtonModule,
        FlexModule,
        MatIconModule,
        TranslocoModule,
        MatDialogModule,
        ConfirmActionDialogModule,
        MatDividerModule
    ],
    declarations: [WebhookCardComponent, ActionsComponent, DetailsComponent, EventsComponent, KeyComponent],
    exports: [WebhookCardComponent]
})
export class WebhookCardModule {}
