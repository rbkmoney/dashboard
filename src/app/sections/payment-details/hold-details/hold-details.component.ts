import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import moment from 'moment';

import { PaymentFlowHold, PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { CancelHoldComponent } from './cancel-hold/cancel-hold.component';
import { AcceptHoldComponent, AcceptHoldData } from './accept-hold/accept-hold.component';

export interface CancelHoldData {
    invoiceID: string;
    paymentID: string;
}

const paymentStatusEnum = PaymentStatus.StatusEnum;
const onHoldExpirationEnum = PaymentFlowHold.OnHoldExpirationEnum;

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

    localePath = 'sections.paymentDetails.holdDetails';

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private dialog: MatDialog) {}

    getActiveHoldText(): string {
        switch (this.flowHold.onHoldExpiration) {
            case onHoldExpirationEnum.Capture:
                return `${this.localePath}.holdWithCapture`;
            case onHoldExpirationEnum.Cancel:
                return `${this.localePath}.holdWithCancel`;
        }
    }

    getExpiredHoldText(): string {
        switch (this.paymentStatus) {
            case paymentStatusEnum.Captured:
                return `${this.localePath}.capturedHoldMessage`;
            case paymentStatusEnum.Cancelled:
                return `${this.localePath}.cancelledHoldMessage`;
        }
    }

    cancelHoldDialog() {
        const data: CancelHoldData = {
            invoiceID: this.invoiceID,
            paymentID: this.paymentID
        };
        this.dialog.open(CancelHoldComponent, {
            data,
            width: '450px',
            disableClose: true
        });
    }

    acceptHoldDialog() {
        const data: AcceptHoldData = {
            invoiceID: this.invoiceID,
            paymentID: this.paymentID,
            currency: this.currency,
            acceptMaxAmount: this.acceptMaxAmount
        };
        this.dialog.open(AcceptHoldComponent, {
            data,
            width: '450px',
            disableClose: true
        });
    }

    isHoldActive(date: string): boolean {
        return moment(date).diff(moment()) > 0 && this.paymentStatus === paymentStatusEnum.Processed;
    }
}
