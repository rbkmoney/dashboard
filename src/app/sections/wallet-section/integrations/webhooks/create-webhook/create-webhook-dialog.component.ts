import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { WebhookScope } from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { CreateWebhookDialogService } from './create-webhook-dialog.service';
import TopicEnum = WebhookScope.TopicEnum;

@Component({
    templateUrl: 'create-webhook-dialog.component.html',
    styleUrls: ['create-webhook-dialog.component.scss'],
    providers: [CreateWebhookDialogService],
})
export class CreateWebhookDialogComponent {
    form = this.createWebhookDialogService.form;
    withdrawalTypes = this.createWebhookDialogService.withdrawalTypes;
    destinationTypes = this.createWebhookDialogService.destinationTypes;
    activeTopic$ = this.createWebhookDialogService.activeTopic$;
    wallets$ = this.createWebhookDialogService.wallets$;
    identities$ = this.createWebhookDialogService.identities$;
    isLoading$ = this.createWebhookDialogService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<CreateWebhookDialogComponent>,
        private createWebhookDialogService: CreateWebhookDialogService
    ) {
        this.createWebhookDialogService.webhookCreated$.pipe(filter((r) => !!r)).subscribe((r) => {
            this.dialogRef.close(r);
        });
    }

    changeActiveTopic(type: TopicEnum) {
        this.createWebhookDialogService.changeActiveTopic(type);
    }

    save() {
        this.createWebhookDialogService.save();
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
