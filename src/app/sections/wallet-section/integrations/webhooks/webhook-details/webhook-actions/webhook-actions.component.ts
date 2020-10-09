import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DeleteWebhookParams } from './delete-webhook-params';

@Component({
    selector: 'dsh-webhook-actions',
    templateUrl: 'webhook-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookActionsComponent {
    @Input() webhookID: string;
    @Input() identityID: string;
    @Output() deleteWebhook = new EventEmitter<DeleteWebhookParams>();
}
