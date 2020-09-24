import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateWebhookDialogComponent } from './create-webhook-dialog';
import { CreateWebhookComponent } from './create-webhook.component';

@NgModule({
    imports: [CommonModule, FlexModule, ButtonModule, TranslocoModule],
    declarations: [CreateWebhookComponent],
    exports: [CreateWebhookComponent],
    entryComponents: [CreateWebhookDialogComponent],
})
export class CreateWebhookModule {}
