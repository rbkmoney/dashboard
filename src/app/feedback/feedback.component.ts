import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';

@Component({
    selector: 'dsh-feedback',
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
    constructor(private dialog: MatDialog) {}

    openFeedbackDialog(): MatDialogRef<FeedbackDialogComponent> {
        return this.dialog.open(FeedbackDialogComponent);
    }
}
