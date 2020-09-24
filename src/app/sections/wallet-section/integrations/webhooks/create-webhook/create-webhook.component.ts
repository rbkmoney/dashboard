import { Component, Input } from '@angular/core';
import { CreateWebhookService } from './create-webhook.service';
import { Identity } from '../../../../../api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-create-webhook',
    templateUrl: 'create-webhook.component.html',
    providers: [CreateWebhookService],
})
export class CreateWebhookComponent {
    @Input()
    identities: Identity[];

    constructor(private createWebhookService: CreateWebhookService) {}

    createWebhook() {
        this.createWebhookService.createWebhook(this.identities);
    }
}
