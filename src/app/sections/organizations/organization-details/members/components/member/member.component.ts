import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { ConfirmActionDialogComponent, ConfirmActionDialogResult } from '@dsh/components/popups';
import { ComponentChanges } from '@dsh/type-utils';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { OrganizationManagementService } from '../../../../services/organization-management/organization-management.service';
import { EditRolesDialogComponent } from '../edit-roles-dialog/edit-roles-dialog.component';
import { EditRolesDialogData } from '../edit-roles-dialog/types/edit-roles-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-member',
    templateUrl: 'member.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent implements OnChanges {
    @Input() orgId: string;
    @Input() member: Member;

    isOwner$: Observable<boolean>;

    constructor(
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrganizationsService,private notificationService: NotificationService, private  errorService: ErrorService
    ) {}

    ngOnChanges({ orgId }: ComponentChanges<MemberComponent>) {
        if (orgId) {
            this.isOwner$ = this.organizationManagementService
                .isOrganizationOwner(orgId.currentValue)
                .pipe(shareReplay(1));
        }
    }

    @ignoreBeforeCompletion
    removeFromOrganization() {
            return this.dialog
                .open<ConfirmActionDialogComponent, void, ConfirmActionDialogResult>(ConfirmActionDialogComponent)
                .afterClosed()
                .pipe(
                    filter((r) => r === 'confirm'),
                    switchMap(() => this.organizationsService.expelOrgMember(this.orgId, this.member.id)),
                    untilDestroyed(this)
                )
                .subscribe(
                    () => this.notificationService.success(),
                    (err) => this.errorService.error(err)
                );
    }

    @ignoreBeforeCompletion
    editRoles() {
        return this.dialog
            .open<EditRolesDialogComponent, EditRolesDialogData>(EditRolesDialogComponent, {
                data: {
                    orgId: this.orgId,
                    userId: this.member.id,
                },
                ...this.dialogConfig.large,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe();
    }
}
