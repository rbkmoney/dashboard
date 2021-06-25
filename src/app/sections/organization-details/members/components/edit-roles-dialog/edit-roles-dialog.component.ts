import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, forkJoin, of, Subscription } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { MemberRole } from '@dsh/api-codegen/organizations';
import { ErrorService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { EditRolesDialogData } from './types/edit-roles-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-edit-roles-dialog',
    templateUrl: 'edit-roles-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRolesDialogComponent {
    roles$ = defer(() => this.updateRoles$).pipe(
        switchMap(() => this.organizationsService.getOrgMember(this.data.orgId, this.data.userId).pipe(pluck('roles'))),
        shareReplay(1)
    );

    private updateRoles$ = new BehaviorSubject<void>(null);

    constructor(
        private dialogRef: MatDialogRef<EditRolesDialogComponent, BaseDialogResponseStatus>,
        @Inject(MAT_DIALOG_DATA) private data: EditRolesDialogData,
        private organizationsService: OrganizationsService,
        private errorService: ErrorService
    ) {}

    cancel(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    addRoles(roles: MemberRole[]): Subscription {
        return forkJoin(
            roles.map((role) => this.organizationsService.assignMemberRole(this.data.orgId, this.data.userId, role))
        )
            .pipe(
                catchError((err) => {
                    this.errorService.error(err);
                    return of(undefined);
                })
            )
            .subscribe(() => this.updateRoles$.next());
    }

    removeRoles(roles: MemberRole[]): Subscription {
        return forkJoin(
            roles.map((role) => this.organizationsService.removeMemberRole(this.data.orgId, this.data.userId, role.id))
        )
            .pipe(
                catchError((err) => {
                    this.errorService.error(err);
                    return of(undefined);
                })
            )
            .subscribe(() => this.updateRoles$.next());
    }
}
