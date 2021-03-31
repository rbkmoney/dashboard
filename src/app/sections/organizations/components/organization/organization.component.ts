import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { filter, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { ConfirmActionDialogComponent, ConfirmActionDialogResult } from '@dsh/components/popups';
import { ComponentChanges } from '@dsh/type-utils';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { FetchOrganizationsService } from '../../services/fetch-organizations/fetch-organizations.service';
import { RenameOrganizationDialogComponent } from '../rename-organization-dialog/rename-organization-dialog.component';
import { RenameOrganizationDialogData } from '../rename-organization-dialog/types/rename-organization-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: Organization;

    member$: Observable<Member>;
    membersCount$: Observable<number>;
    hasAdminAccess$: Observable<boolean>;
    isOwner$: Observable<boolean>;

    constructor(
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrganizationsService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private fetchOrganizationsService: FetchOrganizationsService
    ) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            this.member$ = this.getCurrentMember(organization.currentValue.id);
            this.membersCount$ = this.getMembersCount(organization.currentValue.id);
            this.hasAdminAccess$ = this.organizationManagementService.hasAdminAccess(organization.currentValue);
            this.isOwner$ = this.organizationManagementService.isOrganizationOwner(organization.currentValue);
        }
    }

    @ignoreBeforeCompletion
    leave() {
        return this.dialog
            .open<ConfirmActionDialogComponent, void, ConfirmActionDialogResult>(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.organizationsService.cancelOrgMembership(this.organization.id)),
                untilDestroyed(this)
            )
            .subscribe(
                () => this.notificationService.success(),
                (err) => this.errorService.error(err)
            );
    }

    @ignoreBeforeCompletion
    rename() {
        return this.dialog
            .open<RenameOrganizationDialogComponent, RenameOrganizationDialogData, BaseDialogResponseStatus>(
                RenameOrganizationDialogComponent,
                {
                    ...this.dialogConfig.medium,
                    data: { organization: this.organization },
                }
            )
            .afterClosed()
            .pipe(
                filter((r) => r === BaseDialogResponseStatus.SUCCESS),
                untilDestroyed(this)
            )
            .subscribe(() => this.fetchOrganizationsService.refresh());
    }

    private getCurrentMember(orgId: Organization['id']) {
        return this.organizationManagementService.getCurrentMember(orgId).pipe(shareReplay(1));
    }

    private getMembersCount(orgId: Organization['id']) {
        return this.organizationsService.listOrgMembers(orgId).pipe(pluck('result', 'length'), shareReplay(1));
    }
}
