import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import { Observable } from 'rxjs';

import { Invoice, PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentIds } from '../../types/payment-ids';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';
import { isPaymentFlowHold } from './types/is-payment-flow-hold';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent implements OnChanges {
    @Input() payment: PaymentSearchResult;

    get isHoldShown(): boolean {
        if (isPaymentFlowHold(this.payment.flow)) {
            return !isEmpty(this.payment.flow.heldUntil?.toString());
        }
        return false;
    }

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
