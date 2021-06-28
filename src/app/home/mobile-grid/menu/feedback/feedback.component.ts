import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../../../../feedback/components/feedback-dialog/feedback-dialog.component';

@Component({
    selector: 'dsh-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
    constructor(private dialog: MatDialog) {}

    openFeedbackDialog(): MatDialogRef<FeedbackDialogComponent> {
        return this.dialog.open(FeedbackDialogComponent);
    }
}
