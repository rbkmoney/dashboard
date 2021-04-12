import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { ConfirmActionDialogComponent, ConfirmActionDialogResult } from '@dsh/components/popups';
import { ComponentChanges } from '@dsh/type-utils';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { EditRolesDialogComponent } from '../edit-roles-dialog/edit-roles-dialog.component';
import { EditRolesDialogData } from '../edit-roles-dialog/types/edit-roles-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-member',
    templateUrl: 'member.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent implements OnChanges {
    @Input() organization: Organization;
    @Input() member: Member;

    @Output() changed = new EventEmitter<void>();

    constructor(
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {}

    ngOnChanges({ organization }: ComponentChanges<MemberComponent>) {
        if (organization) {
            this.organizationManagementService.init(organization.currentValue);
        }
    }

    @ignoreBeforeCompletion
    removeFromOrganization() {
        return this.dialog
            .open<ConfirmActionDialogComponent, void, ConfirmActionDialogResult>(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.organizationsService.expelOrgMember(this.organization.id, this.member.id)),
                untilDestroyed(this)
            )
            .subscribe(
                () => {
                    this.notificationService.success();
                    this.changed.emit();
                },
                (err) => this.errorService.error(err)
            );
    }

    @ignoreBeforeCompletion
    editRoles() {
        return this.dialog
            .open<EditRolesDialogComponent, EditRolesDialogData>(EditRolesDialogComponent, {
                data: {
                    orgId: this.organization.id,
                    userId: this.member.id,
                },
                ...this.dialogConfig.large,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(() => this.changed.emit());
    }
}
