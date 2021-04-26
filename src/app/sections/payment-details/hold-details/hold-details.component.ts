import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PaymentFlowHold, PaymentSearchResult, PaymentStatus } from '@dsh/api-codegen/capi/swagger-codegen';

import { CancelHoldComponent, CancelHoldData } from './cancel-hold/cancel-hold.component';
import { ConfirmHoldComponent, ConfirmHoldData } from './confirm-hold/confirm-hold.component';

const PAYMENT_STATUS_ENUM = PaymentStatus.StatusEnum;
const ON_HOLD_EXPIRATION_ENUM = PaymentFlowHold.OnHoldExpirationEnum;

@Component({
    selector: 'dsh-hold-details',
    templateUrl: 'hold-details.component.html',
})
export class HoldDetailsComponent {
    @Input() payment: PaymentSearchResult;

    @Output() holdAction = new EventEmitter();

    get flowHold(): PaymentFlowHold {
        return this.payment.flow as PaymentFlowHold;
    }

    constructor(private dialog: MatDialog) {}

    getActiveHoldText(): string {
        switch (this.flowHold.onHoldExpiration) {
            case ON_HOLD_EXPIRATION_ENUM.Capture:
                return 'holdWithCapture';
            case ON_HOLD_EXPIRATION_ENUM.Cancel:
                return 'holdWithCancel';
        }
    }

    getExpiredHoldText(): string {
        switch (this.payment.status) {
            case PAYMENT_STATUS_ENUM.Captured:
                return 'capturedHoldMessage';
            case PAYMENT_STATUS_ENUM.Cancelled:
                return 'cancelledHoldMessage';
        }
    }

    cancelHoldDialog() {
        const data: CancelHoldData = {
            invoiceID: this.payment.invoiceID,
            paymentID: this.payment.id,
        };
        this.dialog
            .open(CancelHoldComponent, {
                data,
                width: '450px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe((isChanged) => isChanged && this.holdAction.emit(true));
    }

    confirmHoldDialog() {
        const data: ConfirmHoldData = {
            invoiceID: this.payment.invoiceID,
            paymentID: this.payment.id,
            currency: this.payment.currency,
            acceptMaxAmount: this.payment.amount,
        };
        this.dialog
            .open(ConfirmHoldComponent, {
                data,
                width: '450px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe((isChanged) => isChanged && this.holdAction.emit(true));
    }
}
