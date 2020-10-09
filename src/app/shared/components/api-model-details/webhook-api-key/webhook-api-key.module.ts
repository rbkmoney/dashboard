import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { WebhookApiKeyComponent } from './webhook-api-key.component';

@NgModule({
    imports: [FlexModule, TranslocoModule, ClipboardModule, ButtonModule],
    declarations: [WebhookApiKeyComponent],
    exports: [WebhookApiKeyComponent],
})
export class WebhookApiKeyModule {}
