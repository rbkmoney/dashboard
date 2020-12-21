import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Payment } from '../../../../../types/payment';
import { InvoiceDetailsService } from '../../../../../../../../invoice-details/invoice-details.service';
import { ComponentChange, ComponentChanges } from '../../../../../../../../../../type-utils';
import { Observable, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Invoice } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-detail-info',
    templateUrl: './payment-detail-info.component.html',
    styleUrls: ['./payment-detail-info.component.scss'],
})
export class PaymentDetailInfoComponent implements OnInit, OnChanges {
    @Input() payment: Payment;

    invoiceInfo$: Observable<Invoice> = this.invoiceDetails.invoice$;

    protected changes = new ReplaySubject<ComponentChanges<PaymentDetailInfoComponent>>(1);

    constructor(private invoiceDetails: InvoiceDetailsService) {
    }

    ngOnInit(): void {
        const paymentChanges$ = this.changes.pipe(
            map((changes: ComponentChanges<PaymentDetailInfoComponent>) => changes.payment),
            filter(Boolean),
            map((change: ComponentChange<PaymentDetailInfoComponent, 'payment'>) => change.currentValue),
            filter(Boolean)
        );

        paymentChanges$.pipe(
            untilDestroyed(this)
        ).subscribe((payment: Payment) => {
            this.invoiceDetails.initialize(payment.invoiceID);
        })
    }

    ngOnChanges(changes: ComponentChanges<PaymentDetailInfoComponent>): void {
    }
}
