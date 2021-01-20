import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessagesService } from '../../../../../api/sender';
import { ErrorService, NotificationService } from '../../../../services';

const MAX_LENGTH = 2000;

@UntilDestroy()
@Component({
    selector: 'dsh-feedback-dialog',
    templateUrl: 'feedback-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDialogComponent {
    messageControl = this.fb.control('');
    readonly maxLength = MAX_LENGTH;

    constructor(
        private messagesService: MessagesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<FeedbackDialogComponent>,
        private errorService: ErrorService,
        private notificationService: NotificationService,
        private translocoService: TranslocoService
    ) {}

    send() {
        this.messagesService
            .sendFeedbackEmailMsg(this.messageControl.value)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.dialogRef.close();
                this.notificationService.success(this.translocoService.translate('dialog.success', null, 'feedback'));
            }, this.errorService.error);
    }

    cancel() {
        this.dialogRef.close();
    }
}
