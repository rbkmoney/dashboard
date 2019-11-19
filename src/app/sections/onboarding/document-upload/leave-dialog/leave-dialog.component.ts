import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dsh-leave-dialog',
    templateUrl: 'leave-dialog.component.html',
    styleUrls: ['leave-dialog.component.scss']
})
export class LeaveDialogComponent {
    constructor(private dialogRef: MatDialogRef<LeaveDialogComponent>) {}

    cancel() {
        this.dialogRef.close();
    }

    continue() {
        this.dialogRef.close();
    }
}
