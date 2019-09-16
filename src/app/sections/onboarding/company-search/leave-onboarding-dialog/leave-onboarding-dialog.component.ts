import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'leave-onboarding-dialog.component.html'
})
export class LeaveOnboardingDialogComponent {
    dicBasePath = 'sections.onboarding.companySearch.leaveOnboardingDialog';

    constructor(public dialogRef: MatDialogRef<LeaveOnboardingDialogComponent, 'decline' | undefined>) {}

    decline() {
        this.dialogRef.close('decline');
    }

    confirm() {
        this.dialogRef.close();
    }
}
