import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FeedbackDialogComponent } from '@dsh/app/shared/components/dialog';

@Component({
    selector: 'dsh-mobile-menu-feedback-item',
    templateUrl: 'mobile-menu-feedback-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuFeedbackItemComponent {
    constructor(private dialog: MatDialog) {}

    openFeedbackDialog(): MatDialogRef<FeedbackDialogComponent> {
        return this.dialog.open(FeedbackDialogComponent);
    }
}
