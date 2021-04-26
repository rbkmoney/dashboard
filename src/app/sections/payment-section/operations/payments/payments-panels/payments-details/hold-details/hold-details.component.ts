import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { PaymentFlowHold, PaymentSearchResult, PaymentStatus } from '@dsh/api-codegen/anapi';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { PaymentIds } from '../../../types/payment-ids';
import { CancelHoldService } from './cancel-hold';
import { CreateHoldService } from './create-hold';

@UntilDestroy()
@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html',
    styleUrls: ['./hold-details.component.scss'],
})
export class HoldDetailsComponent {
    @Input() payment: PaymentSearchResult;

    @Output() statusChanged = new EventEmitter<PaymentIds>();

    get flowHold(): PaymentFlowHold {
        return this.payment.flow as PaymentFlowHold;
    }

    get holdDate(): string {
        return this.flowHold.heldUntil?.toString() ?? '';
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
            default:
                return '';
        }
    }

    constructor(private cancelHoldService: CancelHoldService, private createHoldService: CreateHoldService) {}

    cancelHold(): void {
        const payment = this.payment;
        this.cancelHoldService
            .openDialog({
                invoiceID: payment.invoiceID,
                paymentID: payment.id,
            })
            .pipe(
                untilDestroyed(this),
                filter((response: BaseDialogResponseStatus) => response === BaseDialogResponseStatus.Success)
            )
            .subscribe(() => {
                this.requestStatusUpdate(payment);
            });
    }

    confirmHold(): void {
        const payment = this.payment;
        this.createHoldService
            .openDialog({
                invoiceID: payment.invoiceID,
                paymentID: payment.id,
                currency: payment.currency,
                maxAllowedAmount: payment.amount,
            })
            .pipe(
                untilDestroyed(this),
                filter((response: BaseDialogResponseStatus) => response === BaseDialogResponseStatus.Success)
            )
            .subscribe(() => {
                this.requestStatusUpdate(payment);
            });
    }

    private requestStatusUpdate({ invoiceID, id: paymentID }: PaymentSearchResult): void {
        this.statusChanged.emit({ invoiceID, paymentID });
    }
}
