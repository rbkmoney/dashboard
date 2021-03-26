import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from '@ngneat/until-destroy';
import { filter, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Invitation, Organization } from '@dsh/api-codegen/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { ConfirmActionDialogComponent, ConfirmActionDialogResult } from '@dsh/components/popups';
import { ignoreBeforeCompletion } from '@dsh/utils';

@Component({
    selector: 'dsh-invitation',
    templateUrl: 'invitation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationComponent {
    @Input() orgId: Organization['id'];
    @Input() invitation: Invitation;

    @Output() changed = new EventEmitter<void>();

    constructor(
        private dialog: MatDialog,
        private organizationsService: OrganizationsService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {}

    @ignoreBeforeCompletion
    cancel() {
        return this.dialog
            .open<ConfirmActionDialogComponent, void, ConfirmActionDialogResult>(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.organizationsService.revokeInvitation(this.invitation as any, this.invitation.id)),
                untilDestroyed(this)
            )
            .subscribe(
                () => {
                    this.changed.emit();
                    this.notificationService.success();
                },
                (err) => this.errorService.error(err)
            );
    }
}
