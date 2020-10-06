import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { CreateWebhookService } from './create-webhook';
import { DeleteWebhookService } from './delete-webhook';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { DeleteWebhookParams } from './webhook-details/webhook-actions';
import { WebhooksExpandedIdManager } from './webhooks-expanded-id-manager.service';

@Component({
    templateUrl: 'webhooks.component.html',
    providers: [WebhooksExpandedIdManager],
})
export class WebhooksComponent implements OnInit, OnDestroy {
    webhooks$ = this.receiveWebhooksService.webhooks$;
    isLoading$ = this.receiveWebhooksService.isLoading$;
    lastUpdated$ = this.receiveWebhooksService.lastUpdated$;
    expandedId$ = this.webhooksExpandedIdManager.expandedId$;

    constructor(
        private receiveWebhooksService: ReceiveWebhooksService,
        private createWebhookService: CreateWebhookService,
        private deleteWebhookService: DeleteWebhookService,
        private webhooksExpandedIdManager: WebhooksExpandedIdManager,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.createWebhookService.init();
        this.receiveWebhooksService.receiveWebhooks();
        this.createWebhookService.webhookCreated$.subscribe(() => {
            this.snackBar.open(
                this.transloco.translate('createWebhook.successfullyCreated', null, 'wallet-webhooks|scoped'),
                'OK',
                { duration: 2000 }
            );
            this.receiveWebhooks();
        });
    }

    ngOnDestroy() {
        this.createWebhookService.destroy();
    }

    createWebhook() {
        this.createWebhookService.createWebhook();
    }

    receiveWebhooks() {
        this.receiveWebhooksService.receiveWebhooks();
    }

    deleteWebhook(params: DeleteWebhookParams) {
        this.deleteWebhookService.deleteWebhook(params);
    }

    expandedIdChange(id: number) {
        this.webhooksExpandedIdManager.expandedIdChange(id);
    }
}
