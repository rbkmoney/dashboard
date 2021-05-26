import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import pick from 'lodash-es/pick';
import moment from 'moment';
import { merge, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { InvoiceService } from '@dsh/api';
import { Invoice, InvoiceTemplateAndToken } from '@dsh/api-codegen/capi';

import { CreateInvoiceOrInvoiceTemplateService } from './create-invoice-or-invoice-template.service';

export enum Type {
    Invoice = 'invoice',
    Tempalte = 'template',
}

export type InvoiceOrInvoiceTemplate = { invoiceOrInvoiceTemplate: InvoiceTemplateAndToken | Invoice; type: Type };

@UntilDestroy()
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

    createInvoiceFormControl = this.createInvoiceOrInvoiceTemplateService.createInvoiceFormControl;
    createInvoiceFormControlEmpty: boolean;
    createInvoiceFormControlValid: boolean;

    constructor(
        private createInvoiceOrInvoiceTemplateService: CreateInvoiceOrInvoiceTemplateService,
        private invoiceService: InvoiceService
    ) {}

    ngOnInit(): void {
        merge(
            this.nextTemplate.pipe(map((template) => ({ invoiceOrInvoiceTemplate: template, type: Type.Tempalte }))),
            this.nextInvoice.pipe(map((invoice) => ({ invoiceOrInvoiceTemplate: invoice, type: Type.Invoice })))
        ).subscribe((invoiceOrInvoiceTemplate) => this.next.emit(invoiceOrInvoiceTemplate));
    }

    create(): void {
        const { value } = this.createInvoiceFormControl;
        this.shops$
            .pipe(
                take(1),
                switchMap((shops) =>
                    this.invoiceService.createInvoice({
                        ...pick(value, ['product', 'description', 'cart', 'shopID']),
                        dueDate: moment(value.dueDate).utc().endOf('d').format(),
                        currency: shops.find((s) => s.id === value.shopID)?.account?.currency,
                        metadata: {},
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe(({ invoice }) => this.nextInvoice.next(invoice));
    }
}
