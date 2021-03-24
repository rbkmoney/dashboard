import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, first, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { MemberRole } from '@dsh/api-codegen/organizations';
import { ErrorService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { inProgressTo } from '@dsh/utils';

import { EditRolesDialogData } from './types/edit-roles-dialog-data';
import { getChangedRoles } from './utils/get-changed-roles';

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
        private organizationsService: OrganizationsService,private errorService: ErrorService
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
                      ]).pipe(
                    catchError((err) => {
                        this.errorService.error(err);
                        return of(undefined);
                    })
            )
                    : EMPTY
            )
        );
    }
}
