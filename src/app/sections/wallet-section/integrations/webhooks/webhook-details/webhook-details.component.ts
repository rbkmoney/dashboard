import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Webhook, WebhookScope, WithdrawalsTopic } from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { DeleteWebhookParams } from './webhook-actions';

@Component({
    selector: 'dsh-webhook-details',
    templateUrl: 'webhook-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookDetailsComponent {
    @Input() webhook: Webhook;
    @Output() deleteWebhook = new EventEmitter<DeleteWebhookParams>();

    getWalletID(scope: WebhookScope): string | null {
        return (scope as WithdrawalsTopic).walletID;
    }
}
