import { Component } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { BehaviorSubject, defer, merge, ReplaySubject, Subject, Subscription } from 'rxjs';
import { mapTo, shareReplay, switchMap } from 'rxjs/operators';

import { InvoiceService, InvoiceTemplatesService } from '@dsh/api';
import { PaymentMethod } from '@dsh/api-codegen/capi';
import { Controls } from '@dsh/app/shared/components/create-payment-link-form';
import { CreatePaymentLinkService } from '@dsh/app/shared/services/create-payment-link';
import { inProgressTo } from '@dsh/utils';

import {
    CreateInvoiceOrInvoiceTemplateService,
    InvoiceOrInvoiceTemplate,
    Type,
} from './create-invoice-or-invoice-template';

enum Step {
    InvoiceTemplate,
    PaymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    styleUrls: ['payment-link.component.scss'],
    providers: [CreateInvoiceOrInvoiceTemplateService],
})
export class PaymentLinkComponent {
    step = Step;
    currentStep = Step.InvoiceTemplate;
    invoiceOrInvoiceTemplate: InvoiceOrInvoiceTemplate;

    paymentMethods$ = new ReplaySubject<PaymentMethod[]>(1);
    formControl = new FormControl<Controls>();
    paymentLink$ = merge(
        defer(() => this.create$).pipe(
            switchMap(() =>
                this.invoiceOrInvoiceTemplate.type === Type.Invoice
                    ? this.createPaymentLinkService.createPaymentLinkByInvoice(
                          this.invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate,
                          this.formControl.value
                      )
                    : this.createPaymentLinkService.createPaymentLinkByTemplate(
                          this.invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate,
                          this.formControl.value
                      )
            )
        ),
        this.formControl.valueChanges.pipe(mapTo(''))
    ).pipe(shareReplay(1));
    inProgress$ = new BehaviorSubject(false);

    private create$ = new Subject<void>();

    constructor(
        private invoiceService: InvoiceService,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private createPaymentLinkService: CreatePaymentLinkService
    ) {}

    @inProgressTo('inProgress$')
    nextInvoiceOrInvoiceTemplate(invoiceOrInvoiceTemplate: InvoiceOrInvoiceTemplate): Subscription {
        return (
            invoiceOrInvoiceTemplate.type === Type.Invoice
                ? this.invoiceService.getInvoicePaymentMethods(invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate.id)
                : this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID(
                      invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate.invoiceTemplate.id
                  )
        ).subscribe((paymentMethods) => {
            this.paymentMethods$.next(paymentMethods);
            this.currentStep = Step.PaymentLink;
            this.invoiceOrInvoiceTemplate = invoiceOrInvoiceTemplate;
        });
    }

    create(): void {
        this.create$.next();
    }
}
