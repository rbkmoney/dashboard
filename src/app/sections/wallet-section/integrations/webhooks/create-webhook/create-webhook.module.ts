import { NgModule } from '@angular/core';

import { CreateWebhookComponent } from './create-webhook.component';
import { FlexModule } from '@angular/flex-layout';
import { ButtonModule } from '@dsh/components/buttons';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { CreateWebhookDialogComponent } from './create-webhook-dialog';

@NgModule({
    imports: [CommonModule, FlexModule, ButtonModule, TranslocoModule],
    declarations: [CreateWebhookComponent],
    exports: [CreateWebhookComponent],
    entryComponents: [CreateWebhookDialogComponent],
})
export class CreateWebhookModule {}
