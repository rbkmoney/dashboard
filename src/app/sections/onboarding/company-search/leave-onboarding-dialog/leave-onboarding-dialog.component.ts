import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'leave-onboarding-dialog.component.html',
    styleUrls: ['leave-onboarding-dialog.component.scss']
})
export class LeaveOnboardingDialogComponent {
    constructor(public dialogRef: MatDialogRef<LeaveOnboardingDialogComponent, 'decline' | undefined>) {}

    decline() {
        this.dialogRef.close('decline');
    }

    confirm() {
        this.dialogRef.close();
    }
}
