import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { filter, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '../../../../../components/popups';
import { ComponentChanges } from '../../../../../type-utils';
import { Member, Organization } from '../../../../api-codegen/organizations';
import { ErrorService } from '../../../../shared/services/error';
import { NotificationService } from '../../../../shared/services/notification';
import { DialogConfig, DIALOG_CONFIG } from '../../../constants';
import { OrganizationManagementService } from '../../services/organization-management/organization-management.service';
import { RenameOrganizationDialogComponent } from '../rename-organization-dialog/rename-organization-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OrganizationManagementService],
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: Organization;

    member$: Observable<Member>;
    membersCount$: Observable<number>;
    isOrganizationOwner$: Observable<boolean>;

    constructor(
        private organizationManagementService: OrganizationManagementService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            const orgId = organization.currentValue.id;
            this.updateMember(orgId);
            this.updateMembersCount(orgId);
            this.isOrganizationOwner$ = this.organizationManagementService
                .isOrganizationOwner(orgId)
                .pipe(shareReplay(1));
        }
    }

    leave() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                take(1),
                switchMap(() => this.organizationManagementService.leaveOrganization(this.organization.id)),
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

    private updateMember(orgId: Organization['id']) {
        this.member$ = this.organizationManagementService.getMember(orgId).pipe(shareReplay(1));
    }

    private updateMembersCount(orgId: Organization['id']) {
        this.membersCount$ = this.organizationManagementService.getMembers(orgId).pipe(pluck('length'), shareReplay(1));
    }
}
