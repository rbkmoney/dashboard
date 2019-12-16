import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'dsh-finish-onboarding-dialog',
    templateUrl: 'finish-onboarding-dialog.component.html',
    styleUrls: ['finish-onboarding-dialog.component.scss']
})
export class FinishOnboardingDialogComponent {
    constructor(private dialogRef: MatDialogRef<FinishOnboardingDialogComponent>) {}

    close() {
        this.dialogRef.close();
    }
}
