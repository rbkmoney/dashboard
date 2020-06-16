import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../../api';
import { Invoice, InvoiceTemplate, InvoiceTemplateAndToken } from '../../../../../api-codegen/capi';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { filterShopsByEnv } from '../../../operations/operators';

export enum Type {
    invoice = 'invoice',
    tempalte = 'template',
}

export type InvoiceOrInvoiceTemplate =
    | { invoiceOrInvoiceTemplate: InvoiceTemplateAndToken; type: Type.tempalte }
    | { invoiceOrInvoiceTemplate: Invoice; type: Type.invoice };

@Component({
    selector: 'dsh-create-invoice-or-invoice-template',
    templateUrl: 'create-invoice-or-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceOrInvoiceTemplateComponent {
    nextInvoice = new Subject<Invoice>();
    nextTemplate = new Subject<InvoiceTemplateAndToken>();

    @Output()
    next = new EventEmitter<InvoiceOrInvoiceTemplate>();

    shops$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    typeForm = this.fb.group({ type: null });

    type = Type;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private shopService: ShopService) {
        this.nextTemplate.subscribe((template) =>
            this.next.emit({ invoiceOrInvoiceTemplate: template, type: Type.tempalte })
        );
    }
}
