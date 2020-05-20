import { Component, Inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { ShopService } from '../../../../../api/shop';
import { LAYOUT_GAP } from '../../../../constants';
import { CreateWebhookService } from './create-webhook.service';

@Component({
    templateUrl: 'create-webhook.component.html',
    providers: [CreateWebhookService]
})
export class CreateWebhookComponent {
    form = this.createWebhookService.form;
    types = this.createWebhookService.invoiceTypes;
    shops$ = this.shopService.shops$;
    isLoading$ = this.createWebhookService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<CreateWebhookComponent>,
        private createWebhookService: CreateWebhookService,
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private shopService: ShopService
    ) {
        this.createWebhookService.webhookCreated$.pipe(filter(r => !!r)).subscribe(r => {
            this.dialogRef.close(r);
        });
    }

    get eventTypes() {
        return this.form.get('eventTypes') as FormArray;
    }

    save() {
        this.createWebhookService.save();
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
