import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CustomersTopic, InvoicesTopic } from '../../../../api-codegen/capi/swagger-codegen';
import { ShopService } from '../../../../api/shop';
import { LAYOUT_GAP } from '../../../constants';
import { CreateWebhookService } from './create-webhook.service';
import { TYPES } from './event-types';

type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

@Component({
    templateUrl: 'create-webhook.component.html',
    providers: [CreateWebhookService]
})
export class CreateWebhookComponent {
    form = this.createWebhookService.form;
    types = TYPES;
    shops$ = this.shopService.shops$;
    webhookSaved$ = this.createWebhookService.webhookSaved$;
    possibleToCreate$ = combineLatest([this.createWebhookService.error$, this.webhookSaved$]);

    constructor(
        private dialogRef: MatDialogRef<CreateWebhookComponent>,
        private createWebhookService: CreateWebhookService,
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private shopService: ShopService
    ) {
        this.webhookSaved$.pipe(filter(r => r)).subscribe(r => this.dialogRef.close(r));
    }

    typesChanged(checked: boolean, type: InvoicesEventTypesEnum | CustomersEventTypesEnum) {
        this.createWebhookService.typesChanged(checked, type);
    }

    save() {
        this.createWebhookService.save();
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
