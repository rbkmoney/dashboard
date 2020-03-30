import { NgModule } from '@angular/core';

import { LayoutModule } from '@dsh/components/layout';

import { WebhookCardComponent } from './webhook-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [WebhookCardComponent],
    imports: [LayoutModule, CommonModule],
    exports: [WebhookCardComponent]
})
export class WebhookCardModule {}
