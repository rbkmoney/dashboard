import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Webhook, WebhooksService as ApiWebhooksService } from '@dsh/api-codegen/capi';

import { genXRequestID } from '../utils';

@Injectable()
export class WebhooksService {
    constructor(private apiWebhooksService: ApiWebhooksService) {}

    createWebhook(params: Webhook): Observable<Webhook> {
        return this.apiWebhooksService.createWebhook(genXRequestID(), params);
    }

    getWebhooks(): Observable<Webhook[]> {
        return this.apiWebhooksService.getWebhooks(genXRequestID());
    }

    getWebhookByID(webhookID: string): Observable<Webhook> {
        return this.apiWebhooksService.getWebhookByID(genXRequestID(), webhookID);
    }

    deleteWebhookByID(webhookID: string): Observable<any> {
        return this.apiWebhooksService.deleteWebhookByID(genXRequestID(), webhookID);
    }
}
