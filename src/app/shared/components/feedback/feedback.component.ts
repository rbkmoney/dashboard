import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfig, DIALOG_CONFIG } from '../../../sections/tokens';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';

@Component({
    selector: 'dsh-feedback',
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
    constructor(private dialog: MatDialog, @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig) {}

    openFeedbackDialog() {
        this.dialog.open(FeedbackDialogComponent, this.dialogConfig.medium);
    }
}
