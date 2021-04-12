import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// TODO: replace with BaseDialogResponseStatus
export type ConfirmActionDialogResult = 'cancel' | 'confirm';

@Component({
    templateUrl: 'confirm-action-dialog.component.html',
    styleUrls: ['confirm-action-dialog.component.scss'],
})
export class ConfirmActionDialogComponent {
    constructor(public dialogRef: MatDialogRef<ConfirmActionDialogComponent, ConfirmActionDialogResult>) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    confirm() {
        this.dialogRef.close('confirm');
    }
}
