import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Webhook, WebhooksService as ApiWebhooksService } from '../../api-codegen/capi';
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

    getWebhookByID(weebhookID: string): Observable<Webhook> {
        return this.apiWebhooksService.getWebhookByID(genXRequestID(), weebhookID);
    }

    deleteWebhookByID(weebhookID: string): Observable<any> {
        return this.apiWebhooksService.deleteWebhookByID(genXRequestID(), weebhookID);
    }
}
