import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';

export class WebhookContainer {
    constructor(webhook: Webhook, isOpen: boolean = false) {
        this.webhook = webhook;
        this.isOpen = isOpen;
    }

    isOpen: boolean;
    webhook: Webhook;
}
