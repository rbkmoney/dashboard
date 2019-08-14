import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import round from 'lodash.round';

import { LAYOUT_GAP } from '../../../constants';
import { AcceptHoldService } from './accept-hold.service';
import { CaptureParams } from '../../../../api/capi/swagger-codegen';
import { toMinorAmountFromString } from '../../../../view-utils/to-minor-from-string-amount';

export interface AcceptHoldData {
    invoiceID: string;
    paymentID: string;
    currency: string;
    acceptMaxAmount: number;
}

@Component({
    selector: 'dsh-accept-hold',
    templateUrl: './accept-hold.component.html',
    providers: [AcceptHoldService]
})
export class AcceptHoldComponent implements OnInit {
    localePath = 'sections.paymentDetails.holdDetails';

    form: FormGroup = undefined;

    isPartialAccept: boolean;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) public data: AcceptHoldData,
        private dialogRef: MatDialogRef<AcceptHoldComponent>,
        private fb: FormBuilder,
        private acceptHoldService: AcceptHoldService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            reason: ['', [Validators.required]]
        });
    }

    decline() {
        this.dialogRef.close();
    }

    confirm() {
        const { reason, amount } = this.form.getRawValue();
        const params = {
            reason,
            amount: toMinorAmountFromString(amount),
            currency: amount ? this.data.currency : null
        } as CaptureParams;
        this.acceptHoldService
            .capturePayment(this.data.invoiceID, this.data.paymentID, params)
            .pipe(take(1))
            .subscribe(_ => {
                this.dialogRef.close();
            });
    }

    onCheckboxChange(value: boolean) {
        this.isPartialAccept = value;
        if (value) {
            this.form.addControl(
                'amount',
                this.fb.control('', [
                    Validators.required,
                    Validators.pattern(/^\d+([\,\.]\d{1,2})?$/),
                    Validators.min(1),
                    Validators.max(round(this.data.acceptMaxAmount / 100, 2))
                ])
            );
        } else {
            this.form.removeControl('amount');
        }
    }
}
