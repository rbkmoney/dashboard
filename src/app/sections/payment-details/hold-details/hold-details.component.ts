import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import moment from 'moment';

import { PaymentFlowHold, PaymentStatus } from '../../../api/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { CancelHoldComponent } from './cancel-hold/cancel-hold.component';
import { AcceptHoldComponent, AcceptHoldData } from './accept-hold/accept-hold.component';

export interface CancelHoldData {
    invoiceID: string;
    paymentID: string;
}

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html'
})
export class HoldDetailsComponent {
    @Input() flowHold: PaymentFlowHold;

    @Input() paymentStatus: PaymentStatus.StatusEnum;

    @Input() invoiceID: string;

    @Input() paymentID: string;

    @Input() currency: string;

    @Input() acceptMaxAmount: number;

    paymentStatusEnum = PaymentStatus.StatusEnum;
    onHoldExpirationEnum = PaymentFlowHold.OnHoldExpirationEnum;

    localePath = 'sections.paymentDetails.holdDetails';

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private dialog: MatDialog) {}

    getActiveHoldText(): string {
        switch (this.flowHold.onHoldExpiration) {
            case this.onHoldExpirationEnum.Capture:
                return `${this.localePath}.holdWithCapture`;
            case this.onHoldExpirationEnum.Cancel:
                return `${this.localePath}.holdWithCancel`;
        }
    }

    getExpiredHoldText(): string {
        switch (this.paymentStatus) {
            case this.paymentStatusEnum.Captured:
                return `${this.localePath}.capturedHoldMessage`;
            case this.paymentStatusEnum.Cancelled:
                return `${this.localePath}.cancelledHoldMessage`;
        }
    }

    cancelHoldDialog() {
        this.dialog.open(CancelHoldComponent, {
            data: {
                invoiceID: this.invoiceID,
                paymentID: this.paymentID
            } as CancelHoldData,
            width: '450px',
            disableClose: true
        });
    }

    acceptHoldDialog() {
        this.dialog.open(AcceptHoldComponent, {
            data: {
                invoiceID: this.invoiceID,
                paymentID: this.paymentID,
                currency: this.currency,
                acceptMaxAmount: this.acceptMaxAmount
            } as AcceptHoldData,
            width: '450px',
            disableClose: true
        });
    }

    isHoldActive(date: string): boolean {
        return moment(date).diff(moment()) > 0 && this.paymentStatus === this.paymentStatusEnum.Processed;
    }
}
