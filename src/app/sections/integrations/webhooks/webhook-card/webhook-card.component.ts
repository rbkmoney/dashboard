import { Component, Input } from '@angular/core';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-webhook-card',
    templateUrl: 'webhook-card.component.html'
})
export class WebhookCardComponent {
    @Input()
    webhook: Webhook;

    isOpen = false;

    toggle() {
        this.isOpen = !this.isOpen;
    }
}
