import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-webhook-actions',
    templateUrl: 'webhook-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookActionsComponent {
    @Input() webhookID: string;
    @Output() deleteWebhook = new EventEmitter<string>();
}
