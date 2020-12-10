import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { pluck, switchMap, take } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api/organizations';

import { UserService } from '../../../../shared';
import { ErrorService } from '../../../../shared/services/error';
import { NotificationService } from '../../../../shared/services/notification';

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
        private dialogRef: MatDialogRef<CreateOrganizationDialogComponent>,
        private organizationsService: OrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private userService: UserService
    ) {}

    create() {
        this.inProgress$.next(true);
        this.userService.profile$
            .pipe(
                take(1),
                pluck('id'),
                // TODO: change after fix Organization['owner'] type
                switchMap((owner: never) =>
                    this.organizationsService.createOrganization({
                        owner,
                        name: this.nameControl.value,
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe(
                () => {
                    this.notificationService.success((t) => t.creation);
                    this.dialogRef.close();
                    this.inProgress$.next(false);
                },
                (err) => {
                    this.errorService.error(err, (t) => t.creation);
                    this.inProgress$.next(false);
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
}
