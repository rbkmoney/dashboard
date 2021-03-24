import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { OrganizationsService } from '@dsh/api';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { inProgressTo } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-create-organization-dialog',
    templateUrl: 'create-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrganizationDialogComponent {
    form = this.fb.group<{ name: string }>({ name: '' });
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<CreateOrganizationDialogComponent, BaseDialogResponseStatus>,
        private organizationsService: OrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fb: FormBuilder
    ) {}

    @inProgressTo('inProgress$')
    create() {
        return this.organizationsService
            .createOrg({
                name: this.form.value.name,
            })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.dialogRef.close(BaseDialogResponseStatus.SUCCESS);
                },
                (err) => this.errorService.error(err)
            );
    }

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.CANCELED);
    }
}
