import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';

import { PaymentFlowHold, PaymentSearchResult, PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { CancelHoldComponent, CancelHoldData } from './cancel-hold/cancel-hold.component';
import { ConfirmHoldComponent, ConfirmHoldData } from './confirm-hold/confirm-hold.component';

const paymentStatusEnum = PaymentStatus.StatusEnum;
const onHoldExpirationEnum = PaymentFlowHold.OnHoldExpirationEnum;

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html'
})
export class HoldDetailsComponent {
    @Input() payment: PaymentSearchResult;

    get flowHold(): PaymentFlowHold {
        return this.payment.flow as PaymentFlowHold;
    }

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private dialog: MatDialog) {}

    getActiveHoldText(): string {
        switch (this.flowHold.onHoldExpiration) {
            case onHoldExpirationEnum.Capture:
                return 'holdWithCapture';
            case onHoldExpirationEnum.Cancel:
                return 'holdWithCancel';
        }
    }

    getExpiredHoldText(): string {
        switch (this.payment.status) {
            case paymentStatusEnum.Captured:
                return 'capturedHoldMessage';
            case paymentStatusEnum.Cancelled:
                return 'cancelledHoldMessage';
        }
    }

    cancelHoldDialog() {
        const data: CancelHoldData = {
            invoiceID: this.payment.invoiceID,
            paymentID: this.payment.id
        };
        this.dialog.open(CancelHoldComponent, {
            data,
            width: '450px',
            disableClose: true
        });
    }

    confirmHoldDialog() {
        const data: ConfirmHoldData = {
            invoiceID: this.payment.invoiceID,
            paymentID: this.payment.id,
            currency: this.payment.currency,
            acceptMaxAmount: this.payment.amount
        };
        this.dialog.open(ConfirmHoldComponent, {
            data,
            width: '450px',
            disableClose: true
        });
    }

    isHoldActive(date: string): boolean {
        return moment(date).diff(moment()) > 0 && this.payment.status === paymentStatusEnum.Processed;
    }
}
