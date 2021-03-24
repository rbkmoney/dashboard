import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { ApiShopsService, OrganizationsService } from '@dsh/api';
import { InviteeContact, MemberRole } from '@dsh/api-codegen/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { inProgressTo } from '@dsh/utils';

import { CreateInvitationDialogData } from './types/create-invitation-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-create-invitation-dialog',
    templateUrl: 'create-invitation-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvitationDialogComponent {
    emailControl = this.fb.control<string>('', Validators.email);
    inProgress$ = new BehaviorSubject<boolean>(false);
    selectedRoles: MemberRole[] = [];

    constructor(
        private dialogRef: MatDialogRef<CreateInvitationDialogComponent, BaseDialogResponseStatus>,
        @Inject(MAT_DIALOG_DATA) private data: CreateInvitationDialogData,
        private organizationsService: OrganizationsService,
        private errorService: ErrorService,
        private notificationService: NotificationService,
        private fb: FormBuilder,
        private shopsService: ApiShopsService
    ) {}

    @inProgressTo('inProgress$')
    create() {
        return this.shopsService.shops$
            .pipe(
                first(),
                switchMap((shops) =>
                    this.organizationsService.createInvitation(this.data.orgId, {
                        invitee: {
                            contact: {
                                type: InviteeContact.TypeEnum.EMail,
                                email: this.emailControl.value,
                            },
                            roles: this.selectedRoles,
                        },
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.dialogRef.close(BaseDialogResponseStatus.SUCCESS);
                },
                (err) => {
                    this.errorService.error(err);
                }
            );
    }

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.CANCELED);
    }

    selectRoles(selectedRoles: MemberRole[]) {
        this.selectedRoles = selectedRoles;
    }
}
