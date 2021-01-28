import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { filter, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { ConfirmActionDialogComponent, ConfirmActionDialogResult } from '@dsh/components/popups';

import { ComponentChanges } from '../../../../../../type-utils';
import { OrganizationManagementService } from '../../../services/organization-management/organization-management.service';
import { RenameOrganizationDialogComponent } from '../rename-organization-dialog/rename-organization-dialog.component';

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
    isOrganizationOwner$: Observable<boolean>;

    constructor(
        private organizationManagementService: OrganizationManagementService,
        private organizationsService: OrganizationsService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            this.member$ = this.getCurrentMember(organization.currentValue.id);
            this.membersCount$ = this.getMembersCount(organization.currentValue.id);
            this.isOrganizationOwner$ = this.getIsOrganizationOwner(organization.currentValue);
        }
    }

    leave() {
        this.dialog
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

    rename() {
        this.dialog.open(RenameOrganizationDialogComponent, {
            ...this.dialogConfig.medium,
            data: { organization: this.organization },
        });
    }

    private getCurrentMember(orgId: Organization['id']) {
        return this.organizationManagementService.getCurrentMember(orgId).pipe(shareReplay(1));
    }

    private getMembersCount(orgId: Organization['id']) {
        return this.organizationsService.listOrgMembers(orgId).pipe(pluck('result', 'length'), shareReplay(1));
    }

    private getIsOrganizationOwner(org: Organization) {
        return this.organizationManagementService.isOrganizationOwner(org).pipe(shareReplay(1));
    }
}
