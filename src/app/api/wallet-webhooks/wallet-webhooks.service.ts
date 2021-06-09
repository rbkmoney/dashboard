import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { Webhook, WebhooksService as ApiWebhooksService } from '@dsh/api-codegen/wallet-api';

@Injectable()
export class WalletWebhooksService {
    constructor(private apiWebhooksService: ApiWebhooksService, private idGenerator: IdGeneratorService) {}

    createWebhook(params: Webhook): Observable<Webhook> {
        return this.apiWebhooksService.createWebhook(this.idGenerator.shortUuid(), params);
    }

    getWebhooks(identityID: string): Observable<Webhook[]> {
        return this.apiWebhooksService.getWebhooks(this.idGenerator.shortUuid(), identityID);
    }

    getWebhookByID(webhookID: string, identityID: string): Observable<Webhook> {
        return this.apiWebhooksService.getWebhookByID(this.idGenerator.shortUuid(), webhookID, identityID);
    }

    deleteWebhookByID(webhookID: string, identityID: string): Observable<any> {
        return this.apiWebhooksService.deleteWebhookByID(this.idGenerator.shortUuid(), webhookID, identityID);
    }
}
