import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';


import { ButtonModule } from '@dsh/components/buttons';
import { LayoutModule } from '@dsh/components/layout';

import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { KeyComponent } from './key/key.component';
import { WebhookCardComponent } from './webhook-card.component';

@NgModule({
    declarations: [WebhookCardComponent, ActionsComponent, DetailsComponent, EventsComponent, KeyComponent],
    imports: [LayoutModule, CommonModule, ButtonModule, FlexModule, MatIconModule, cdkMo],
    exports: [WebhookCardComponent]
})
export class WebhookCardModule {}
