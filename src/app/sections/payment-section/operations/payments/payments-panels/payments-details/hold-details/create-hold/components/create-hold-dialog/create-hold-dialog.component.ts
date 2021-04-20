import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CaptureParams } from '@dsh/api-codegen/capi';
import { PaymentService } from '@dsh/api/payment';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services';
import { amountValidator } from '@dsh/components/form-controls';
import { isNil, toMajor, toMinor } from '@dsh/utils';

import { CreateRefundForm } from '../../../../refunds/create-refund/types/create-refund-form';
import { MAX_REASON_LENGTH } from '../../../consts';
import { CreateHoldDialogData } from '../../types/create-hold-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-create-hold-dialog',
    templateUrl: './create-hold-dialog.component.html',
    styleUrls: ['./create-hold-dialog.component.scss'],
    providers: [PaymentService],
})
export class CreateHoldDialogComponent {
    maxReasonLength: number = MAX_REASON_LENGTH;
    form: FormGroup<CreateRefundForm> = this.fb.group({
        reason: ['', Validators.maxLength(this.maxReasonLength)],
    });

    isPartial = false;

    get maxAllowedAmount(): number {
        return toMajor(this.dialogData.maxAllowedAmount);
    }

    get currency(): string {
        return this.dialogData.currency;
    }

    get amountControl(): FormControl<number> | null {
        return this.form.controls.amount ?? null;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: CreateHoldDialogData,
        private dialogRef: MatDialogRef<CreateHoldDialogComponent, BaseDialogResponseStatus>,
        private fb: FormBuilder,
        private paymentService: PaymentService,
        private errorService: ErrorService
    ) {}

    confirm(): void {
        const params = this.formatParams();
        const { invoiceID, paymentID } = this.dialogData;

        this.paymentService
            .capturePayment(invoiceID, paymentID, params)
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.dialogRef.close(BaseDialogResponseStatus.Success);
                },
                (err: Error) => {
                    this.errorService.error(err);
                    this.dialogRef.close(BaseDialogResponseStatus.Error);
                }
            );
    }

    decline(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    togglePartialRefund(value: boolean): void {
        this.isPartial = value;

        if (value) {
            this.addAmountControl();
        } else {
            this.removeAmountControl();
        }
    }

    private formatParams(): CaptureParams {
        const { reason, amount = null } = this.form.value;
        const { currency } = this.dialogData;
        const params: CaptureParams = {
            reason,
            currency,
        };

        if (!isNil(amount) && !isNaN(amount)) {
            params.amount = toMinor(amount);
        }

        return params;
    }

    private addAmountControl(): void {
        this.form.addControl(
            'amount',
            this.fb.control(null, [
                Validators.required,
                amountValidator,
                Validators.min(1),
                Validators.max(this.maxAllowedAmount),
            ])
        );
    }

    private removeAmountControl(): void {
        this.form.removeControl('amount');
    }
}
