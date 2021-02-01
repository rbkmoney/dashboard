import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { ApiShopsService, OrganizationsService } from '@dsh/api';
import { Organization, ResourceScopeId } from '@dsh/api-codegen/organizations';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { inProgressTo } from '@dsh/utils';

import { OrganizationManagementService } from '../../../../services/organization-management/organization-management.service';

export type CreateInvitationDialogResult = 'success' | 'cancel';
export type CreateInvitationDialogData = { orgId: Organization['id'] };

interface CreateInvitationForm {
    email: string;
}

@UntilDestroy()
@Component({
    selector: 'dsh-create-invitation-dialog',
    templateUrl: 'create-invitation-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OrganizationManagementService],
})
export class CreateInvitationDialogComponent {
    form = this.fb.group<CreateInvitationForm>({
        email: ['', Validators.email],
    });
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<CreateInvitationDialogComponent, CreateInvitationDialogResult>,
        @Inject(MAT_DIALOG_DATA) private data: { orgId: Organization['id'] },
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
                                type: 'EMail',
                                email: this.form.value.email,
                            },
                            // TODO
                            roles: shops.slice(0, 1).map((shop) => ({
                                roleId: 'Administrator',
                                scope: {
                                    id: ResourceScopeId.Shop,
                                    resourceId: shop.id,
                                },
                            })) as any,
                        },
                    })
                ),
                untilDestroyed(this)
            )
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.dialogRef.close('success');
                },
                (err) => {
                    this.errorService.error(err);
                }
            );
    }

    cancel() {
        this.dialogRef.close('cancel');
    }
}
