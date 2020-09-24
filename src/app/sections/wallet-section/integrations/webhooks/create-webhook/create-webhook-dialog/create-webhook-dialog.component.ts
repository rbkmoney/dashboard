import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { WebhookScope } from '../../../../../../api-codegen/wallet-api/swagger-codegen';
import { ReceiveIdentitiesService } from '../../receive-identities.service';
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
    identities$ = this.receiveIdentitiesService.identities$;
    isLoading$ = this.createWebhookDialogService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<CreateWebhookDialogComponent>,
        private createWebhookDialogService: CreateWebhookDialogService,
        private receiveIdentitiesService: ReceiveIdentitiesService
    ) {
        this.createWebhookDialogService.webhookCreated$.pipe(filter((r) => !!r)).subscribe((r) => {
            this.dialogRef.close(r);
        });
    }

    get eventTypes() {
        return this.form.get('eventTypes') as FormArray;
    }

    eventTypeChange(type: TopicEnum) {
        this.createWebhookDialogService.eventTypeChange(type);
    }

    save() {
        this.createWebhookDialogService.save();
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
