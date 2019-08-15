import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { LAYOUT_GAP } from '../../../constants';
import { CancelHoldService } from './cancel-hold.service';

export interface CancelHoldData {
    invoiceID: string;
    paymentID: string;
}

@Component({
    selector: 'dsh-cancel-hold',
    templateUrl: './cancel-hold.component.html',
    providers: [CancelHoldService]
})
export class CancelHoldComponent {
    localePath = 'sections.paymentDetails.holdDetails';

    form: FormGroup = this.fb.group({
        reason: ['', [Validators.required]]
    });

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) public data: CancelHoldData,
        private dialogRef: MatDialogRef<CancelHoldComponent>,
        private fb: FormBuilder,
        private cancelHoldService: CancelHoldService
    ) {}

    decline() {
        this.dialogRef.close();
    }

    confirm() {
        const { reason } = this.form.getRawValue();
        this.cancelHoldService
            .cancelPayment(this.data.invoiceID, this.data.paymentID, reason)
            .pipe(take(1))
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}
