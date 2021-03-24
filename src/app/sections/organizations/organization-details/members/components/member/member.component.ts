import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Member } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { EditRolesDialogComponent } from '../edit-roles-dialog/edit-roles-dialog.component';
import { EditRolesDialogData } from '../edit-roles-dialog/types/edit-roles-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-member',
    templateUrl: 'member.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent {
    @Input() orgId: string;
    @Input() member: Member;

    constructor(private dialog: MatDialog, @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig) {}

    removeFromOrganization() {}

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
