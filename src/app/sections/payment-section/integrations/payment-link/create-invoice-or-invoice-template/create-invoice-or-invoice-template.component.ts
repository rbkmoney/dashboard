import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Invoice, InvoiceTemplateAndToken } from '@dsh/api-codegen/capi';

import { CreateInvoiceOrInvoiceTemplateService } from './create-invoice-or-invoice-template.service';

export enum Type {
    Invoice = 'invoice',
    Tempalte = 'template',
}

export type InvoiceOrInvoiceTemplate = { invoiceOrInvoiceTemplate: InvoiceTemplateAndToken | Invoice; type: Type };

@Component({
    selector: 'dsh-create-invoice-or-invoice-template',
    templateUrl: 'create-invoice-or-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceOrInvoiceTemplateComponent implements OnInit {
    @Output()
    next = new EventEmitter<InvoiceOrInvoiceTemplate>();

    nextInvoice = new Subject<Invoice>();
    nextTemplate = new Subject<InvoiceTemplateAndToken>();

    shops$ = this.createInvoiceOrInvoiceTemplateService.shops$;
    form = this.createInvoiceOrInvoiceTemplateService.form;
    type = Type;

    constructor(private createInvoiceOrInvoiceTemplateService: CreateInvoiceOrInvoiceTemplateService) {}

    ngOnInit() {
        merge(
            this.nextTemplate.pipe(map((template) => ({ invoiceOrInvoiceTemplate: template, type: Type.Tempalte }))),
            this.nextInvoice.pipe(map((invoice) => ({ invoiceOrInvoiceTemplate: invoice, type: Type.Invoice })))
        ).subscribe((invoiceOrInvoiceTemplate) => this.next.emit(invoiceOrInvoiceTemplate));
    }
}
