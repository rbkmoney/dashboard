import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { OrganizationsService } from '@dsh/api';
import { Organization } from '@dsh/api-codegen/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { inProgressTo } from '@dsh/utils';

export type RenameOrganizationDialogData = {
    organization: Organization;
};

@UntilDestroy()
@Component({
    selector: 'dsh-rename-organization-dialog',
    templateUrl: 'rename-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameOrganizationDialogComponent {
    form: FormGroup<{ name: string }>;
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<RenameOrganizationDialogComponent, BaseDialogResponseStatus>,
        private organizationsService: OrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: RenameOrganizationDialogData
    ) {
        this.form = this.fb.group({ name: data.organization.name });
    }

    @inProgressTo('inProgress$')
    update() {
        return this.organizationsService
            .patchOrg(this.data.organization.id, {
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
