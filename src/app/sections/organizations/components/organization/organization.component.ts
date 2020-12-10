import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { filter, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '../../../../../components/popups';
import { ComponentChanges } from '../../../../../type-utils';
import { Member, Organization } from '../../../../api-codegen/organizations';
import { ErrorService } from '../../../../shared/services/error';
import { NotificationService } from '../../../../shared/services/notification';
import { DialogConfig, DIALOG_CONFIG } from '../../../constants';
import { FetchOrganizationMemberService } from '../../services/fetch-organization-member/fetch-organization-member.service';
import { RenameOrganizationDialogComponent } from '../rename-organization-dialog/rename-organization-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchOrganizationMemberService],
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: Organization;

    member$: Observable<Member>;
    membersCount$: Observable<number>;

    constructor(
        private fetchOrganizationMemberService: FetchOrganizationMemberService,
        private dialog: MatDialog,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            this.updateMember(organization.currentValue.id);
            this.updateMembersCount(organization.currentValue.id);
        }
    }

    leave() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.fetchOrganizationMemberService.leaveOrganization(this.organization.id)),
                untilDestroyed(this)
            )
            .subscribe(
                () => this.notificationService.success(),
                (err) => this.errorService.error(err)
            );
    }

    rename() {
        this.dialog.open(RenameOrganizationDialogComponent, {
            ...this.dialogConfig.m,
            data: { organization: this.organization },
        });
    }

    private updateMember(orgId: Organization['id']) {
        this.member$ = this.fetchOrganizationMemberService.getMember(orgId).pipe(shareReplay(1));
    }

    private updateMembersCount(orgId: Organization['id']) {
        this.membersCount$ = this.fetchOrganizationMemberService
            .getMembers(orgId)
            .pipe(pluck('length'), shareReplay(1));
    }
}
