import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { ErrorService } from '../../../../shared/services/error';
import { NotificationService } from '../../../../shared/services/notification';
import { OrganizationManagementService } from '../../services/organization-management/organization-management.service';

export type Status = 'success' | 'cancel';

@UntilDestroy()
@Component({
    selector: 'dsh-create-organization-dialog',
    templateUrl: 'create-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrganizationDialogComponent {
    nameControl = new FormControl<string>('');
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<CreateOrganizationDialogComponent, Status>,
        private organizationManagementService: OrganizationManagementService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {}

    create() {
        this.inProgress$.next(true);
        this.organizationManagementService
            .createOrganization({
                name: this.nameControl.value,
            })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.inProgress$.next(false);
                    this.notificationService.success();
                    this.dialogRef.close('success');
                },
                (err) => {
                    this.errorService.error(err);
                    this.inProgress$.next(false);
                }
            );
    }

    cancel() {
        this.dialogRef.close('cancel');
    }
}
