import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { first, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { MemberRole } from '@dsh/api-codegen/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { inProgressTo } from '@dsh/utils';

function hasRole(roles: MemberRole[], role: MemberRole) {
    return roles.findIndex((r) => isEqual(r, role)) !== -1;
}

function getAddedRoles(sourceRoles: MemberRole[], changedRoles: MemberRole[]) {
    return changedRoles.filter((role) => !hasRole(sourceRoles, role));
}

function getChangedRoles(oldRoles: MemberRole[], newRoles: MemberRole[]) {
    return {
        added: getAddedRoles(oldRoles, newRoles),
        removed: getAddedRoles(newRoles, oldRoles),
    };
}

export interface EditRolesDialogData {
    orgId: string;
    userId: string;
}

@UntilDestroy()
@Component({
    selector: 'dsh-edit-roles-dialog',
    templateUrl: 'edit-roles-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRolesDialogComponent {
    inProgress$ = new BehaviorSubject<boolean>(false);
    roles$: Observable<MemberRole[]>;

    private updateRoles$ = new BehaviorSubject<void>(null);

    constructor(
        private dialogRef: MatDialogRef<EditRolesDialogComponent, BaseDialogResponseStatus>,
        @Inject(MAT_DIALOG_DATA) private data: EditRolesDialogData,
        private organizationsService: OrganizationsService
    ) {
        this.roles$ = this.updateRoles$.pipe(
            switchMap(() =>
                this.organizationsService.getOrgMember(this.data.orgId, this.data.userId).pipe(pluck('roles'))
            ),
            shareReplay(1)
        );
    }

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.CANCELED);
    }

    @inProgressTo('inProgress$')
    selectRoles(selectedRoles: MemberRole[]) {
        return this.updateRoles(this.data.orgId, this.data.orgId, selectedRoles)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.updateRoles$.next());
    }

    private updateRoles(orgId: string, userId: string, newRoles: MemberRole[]) {
        return this.roles$.pipe(
            first(),
            map((roles) => getChangedRoles(roles, newRoles)),
            switchMap(({ added, removed }) =>
                added.length || removed.length
                    ? forkJoin([
                          ...added.map((role) => this.organizationsService.assignMemberRole(orgId, userId, role)),
                          ...removed.map((role) => this.organizationsService.removeMemberRole(orgId, userId, role)),
                      ])
                    : of()
            )
        );
    }
}
