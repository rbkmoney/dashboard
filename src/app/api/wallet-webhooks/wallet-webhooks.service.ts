import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Webhook, WebhooksService as ApiWebhooksService } from '@dsh/api-codegen/wallet-api';

import { genXRequestID } from '../utils';

@Injectable()
export class WalletWebhooksService {
    constructor(private apiWebhooksService: ApiWebhooksService) {}

    createWebhook(params: Webhook): Observable<Webhook> {
        return this.apiWebhooksService.createWebhook(genXRequestID(), params);
    }

    getWebhooks(identityID: string): Observable<Webhook[]> {
        return this.apiWebhooksService.getWebhooks(genXRequestID(), identityID);
    }

    getWebhookByID(webhookID: string, identityID: string): Observable<Webhook> {
        return this.apiWebhooksService.getWebhookByID(genXRequestID(), webhookID, identityID);
    }

    deleteWebhookByID(webhookID: string, identityID: string): Observable<any> {
        return this.apiWebhooksService.deleteWebhookByID(genXRequestID(), webhookID, identityID);
    }
}
