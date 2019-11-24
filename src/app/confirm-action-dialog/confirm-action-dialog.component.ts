import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'confirm-action-dialog.component.html',
    styleUrls: ['confirm-action-dialog.component.scss']
})
export class ConfirmActionDialog {
    constructor(public dialogRef: MatDialogRef<ConfirmActionDialog, 'cancel' | 'confirm'>) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    confirm() {
        this.dialogRef.close('confirm');
    }
}
