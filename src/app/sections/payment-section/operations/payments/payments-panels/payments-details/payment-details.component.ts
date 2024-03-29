import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';
import { Observable } from 'rxjs';

import { Invoice, PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

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
    @Output() refreshPayment: EventEmitter<PaymentIds> = new EventEmitter();

    get isHoldShown(): boolean {
        if (isPaymentFlowHold(this.payment.flow)) {
            return !isEmpty(this.payment.flow.heldUntil?.toString());
        }
        return false;
    }

    invoiceInfo$: Observable<Invoice> = this.invoiceDetails.invoice$;

    constructor(private invoiceDetails: InvoiceDetailsService) {}

    ngOnChanges(changes: ComponentChanges<PaymentDetailsComponent>): void {
        if (isObject(changes.payment)) {
            this.changeInvoiceID(changes.payment);
        }
    }

    refresh(ids: PaymentIds): void {
        this.refreshPayment.emit(ids);
    }

    private changeInvoiceID({ currentValue: payment }: ComponentChange<PaymentDetailsComponent, 'payment'>): void {
        if (isNil(payment)) {
            return;
        }
        this.invoiceDetails.setInvoiceID(payment.invoiceID);
    }
}
