import { Component, Input, OnChanges } from '@angular/core';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import { Observable, ReplaySubject } from 'rxjs';

import { Invoice } from '@dsh/api-codegen/capi';

import { ComponentChange, ComponentChanges } from '../../../../../../../../../../type-utils';
import { InvoiceDetailsService } from '../../../../../../../../invoice-details/invoice-details.service';
import { Payment } from '../../../../../types/payment';

@Component({
    selector: 'dsh-payment-detail-info',
    templateUrl: './payment-detail-info.component.html',
    styleUrls: ['./payment-detail-info.component.scss'],
})
export class PaymentDetailInfoComponent implements OnChanges {
    @Input() payment: Payment;

    invoiceInfo$: Observable<Invoice> = this.invoiceDetails.invoice$;

    protected changes = new ReplaySubject<ComponentChanges<PaymentDetailInfoComponent>>(1);

    constructor(private invoiceDetails: InvoiceDetailsService) {}

    ngOnChanges(changes: ComponentChanges<PaymentDetailInfoComponent>): void {
        if (isObject(changes.payment)) {
            this.updatePayment(changes.payment);
        }
    }

    private updatePayment({ currentValue: payment }: ComponentChange<PaymentDetailInfoComponent, 'payment'>): void {
        if (isNil(payment)) {
            return;
        }
        this.invoiceDetails.initialize(payment.invoiceID);
    }
}
