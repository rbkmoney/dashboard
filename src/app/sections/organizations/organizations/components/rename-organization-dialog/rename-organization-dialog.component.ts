import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { Organization } from '@dsh/api-codegen/organizations';
import { OrganizationsService } from '@dsh/api/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';

@UntilDestroy()
@Component({
    selector: 'dsh-rename-organization-dialog',
    templateUrl: 'rename-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameOrganizationDialogComponent {
    nameControl: FormControl<string>;
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<RenameOrganizationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { organization: Organization },
        private organizationsService: OrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {
        this.nameControl = new FormControl<string>(data.organization.name);
    }

    create() {
        this.inProgress$.next(true);
        this.organizationsService
            .patchOrg(this.data.organization.id, { name: this.nameControl.value })
            .pipe(untilDestroyed(this))
            .subscribe(
                () => {
                    this.inProgress$.next(false);
                    this.notificationService.success();
                    this.dialogRef.close();
                },
                (err) => {
                    this.inProgress$.next(false);
                    this.errorService.error(err);
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
}
