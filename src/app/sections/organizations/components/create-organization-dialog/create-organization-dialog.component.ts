import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { ErrorService } from '../../../../shared/services/error';
import { NotificationService } from '../../../../shared/services/notification';
import { FetchOrganizationsService } from '../../services/fetch-organizations/fetch-organizations.service';

@UntilDestroy()
@Component({
    templateUrl: 'create-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrganizationDialogComponent {
    nameControl = new FormControl<string>('');
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<CreateOrganizationDialogComponent>,
        private organizationsService: FetchOrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {}

    create() {
        this.inProgress$.next(true);
        this.organizationsService
            .create({
                name: this.nameControl.value,
            })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.inProgress$.next(false);
                    this.notificationService.success();
                    this.dialogRef.close();
                },
                (err) => {
                    this.errorService.error(err);
                    this.inProgress$.next(false);
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
}
