import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { MessagesService } from '@dsh/api/sender';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { inProgressTo } from '@dsh/utils';

const MAX_LENGTH = 2000;

@UntilDestroy()
@Component({
    selector: 'dsh-feedback-dialog',
    templateUrl: './feedback-dialog.component.html',
})
export class FeedbackDialogComponent {
    messageControl = this.fb.control('');
    readonly maxLength = MAX_LENGTH;
    inProgress$ = new BehaviorSubject(false);

    constructor(
        private messagesService: MessagesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<FeedbackDialogComponent>,
        private errorService: ErrorService,
        private notificationService: NotificationService,
        private translocoService: TranslocoService
    ) {}

    @inProgressTo('inProgress$')
    send() {
        return this.messagesService
            .sendFeedbackEmailMsg(this.messageControl.value)
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.dialogRef.close();
                    this.notificationService.success(
                        this.translocoService.translate('dialog.success', null, 'feedback')
                    );
                },
                (err) => {
                    this.errorService.error(err);
                }
            );
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
