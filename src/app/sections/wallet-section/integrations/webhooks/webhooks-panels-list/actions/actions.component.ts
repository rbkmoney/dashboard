import { Component, Input } from '@angular/core';

import { RemoveWebhookService } from './remove-webhook.service';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html',
    providers: [RemoveWebhookService],
})
export class ActionsComponent {
    @Input()
    webhookID: string;

    @Input()
    identityID: string;

    constructor(private removeWebhookService: RemoveWebhookService) {}

    delete() {
        this.removeWebhookService.removeWebhook(this.webhookID, this.identityID);
    }
}
