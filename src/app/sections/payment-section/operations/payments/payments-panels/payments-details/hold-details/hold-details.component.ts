import { Component, Input } from '@angular/core';

import { PaymentFlowHold, PaymentStatus } from '@dsh/api-codegen/capi';

import { Payment } from '../../../types/payment';
import { CancelHoldService } from './cancel-hold';
import { CreateHoldService } from './create-hold';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html',
    styleUrls: ['./hold-details.component.scss'],
})
export class HoldDetailsComponent {
    @Input() payment: Payment;

    get flowHold(): PaymentFlowHold {
        return this.payment.flow as PaymentFlowHold;
    }

    get holdDate(): string {
        return this.flowHold.heldUntil.toString();
    }

    get activeHoldText(): string {
        switch (this.flowHold.onHoldExpiration) {
            case PaymentFlowHold.OnHoldExpirationEnum.Capture:
                return 'holdWithCapture';
            case PaymentFlowHold.OnHoldExpirationEnum.Cancel:
                return 'holdWithCancel';
        }
    }

    get expiredHoldText(): string {
        switch (this.payment.status) {
            case PaymentStatus.StatusEnum.Captured:
                return 'capturedHoldMessage';
            case PaymentStatus.StatusEnum.Cancelled:
                return 'cancelledHoldMessage';
        }
    }

    constructor(private cancelHoldService: CancelHoldService, private createHoldService: CreateHoldService) {}

    cancelHold(): void {
        this.cancelHoldService.openDialog({
            invoiceID: this.payment.invoiceID,
            paymentID: this.payment.id,
        });
    }

    confirmHold(): void {
        this.createHoldService.openDialog({
            invoiceID: this.payment.invoiceID,
            paymentID: this.payment.id,
            currency: this.payment.currency,
            maxAllowedAmount: this.payment.amount,
        });
    }
}
