import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Webhook } from '@dsh/api-codegen/capi';
import { ExpandedIdManager } from '@dsh/app/shared/services';

import { ReceiveWebhooksService } from './receive-webhooks.service';

@Injectable()
export class WebhooksExpandedIdManager extends ExpandedIdManager<Webhook> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private receiveWebhooksService: ReceiveWebhooksService
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Webhook[]> {
        return this.receiveWebhooksService.webhooks$;
    }
}
