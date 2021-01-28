import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Moment } from 'moment';
import { BehaviorSubject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { ApiShopsService, OrganizationsService } from '@dsh/api';
import { Organization, ResourceScopeId } from '@dsh/api-codegen/organizations';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';

import { inProgressTo } from '../../../../../../../utils';
import { OrganizationManagementService } from '../../../../services/organization-management/organization-management.service';

export type Status = 'success' | 'cancel';

interface CreateInvitationForm {
    expiresAt: Moment;
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
        expiresAt: null,
        email: null,
    });
    inProgress$ = new BehaviorSubject<boolean>(false);

    constructor(
        private dialogRef: MatDialogRef<CreateInvitationDialogComponent, Status>,
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
                        expiresAt: this.form.value.expiresAt.utc().format(),
                        invitee: {
                            contact: {
                                type: 'EMail',
                                email: this.form.value.email,
                            },
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
