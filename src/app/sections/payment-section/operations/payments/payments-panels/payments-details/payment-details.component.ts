import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import { Observable } from 'rxjs';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { Invoice } from '@dsh/api-codegen/capi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentIds } from '../../types/payment-ids';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent implements OnChanges {
    @Input() payment: PaymentSearchResult;

    invoiceInfo$: Observable<Invoice> = this.invoiceDetails.invoice$;

    constructor(private invoiceDetails: InvoiceDetailsService, private paymentsService: PaymentsService) {}

    ngOnChanges(changes: ComponentChanges<PaymentDetailsComponent>): void {
        if (isObject(changes.payment)) {
            this.changeInvoiceID(changes.payment);
        }
    }

    updatePayment({ invoiceID, paymentID }: PaymentIds): void {
        this.paymentsService.updatePayment(invoiceID, paymentID);
    }

    private changeInvoiceID({ currentValue: payment }: ComponentChange<PaymentDetailsComponent, 'payment'>): void {
        if (isNil(payment)) {
            return;
        }
        this.invoiceDetails.setInvoiceID(payment.invoiceID);
    }
}
