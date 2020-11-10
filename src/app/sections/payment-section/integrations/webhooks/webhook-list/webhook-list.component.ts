import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { Webhook, WebhookScope } from '../../../../../api-codegen/capi/swagger-codegen';
import { DeleteWebhookService } from '../delete-webhook';
import { getShopIdFromScope } from '../get-shop-id-from-scope';

@Component({
    selector: 'dsh-webhooks-list',
    templateUrl: 'webhook-list.component.html',
})
export class WebhookListComponent implements OnInit, OnDestroy {
    @Input() webhooks: Webhook[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
    @Output() refreshData: EventEmitter<void> = new EventEmitter();

    constructor(
        private deleteWebhookService: DeleteWebhookService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.deleteWebhookService.init();
        this.deleteWebhookService.webhookDeleted$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('actions.delete.success', null, 'webhook|scoped'), 'OK', {
                duration: 2000,
            });
            this.refreshData.emit();
        });
    }

    ngOnDestroy(): void {
        this.deleteWebhookService.destroy();
    }

    deleteWebhook(id: string) {
        this.deleteWebhookService.deleteWebhook(id);
    }

    getShopID(scope: WebhookScope): string {
        return getShopIdFromScope(scope);
    }
}
