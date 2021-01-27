import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { first, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { ignoreBeforeCompletion } from '../../../../../utils';
import { CreateInvitationDialogComponent } from './create-invitation-dialog/create-invitation-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-invitations',
    templateUrl: './invitations.component.html',
})
export class InvitationsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        shareReplay(1)
    );

    constructor(
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private organizationsService: OrganizationsService,
        private route: ActivatedRoute
    ) {}

    @ignoreBeforeCompletion
    createInvitation() {
        return this.organization$
            .pipe(first(), untilDestroyed(this))
            .subscribe(({ id: orgId }) =>
                this.dialog.open(CreateInvitationDialogComponent, { ...this.dialogConfig.medium, data: { orgId } })
            );
    }
}
