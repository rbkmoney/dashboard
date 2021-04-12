import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, first, shareReplay, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { CreateInvitationDialogComponent } from './components/create-invitation-dialog/create-invitation-dialog.component';
import { CreateInvitationDialogData } from './components/create-invitation-dialog/types/create-invitation-dialog-data';
import { FetchInvitationsService } from './services/fetch-invitations/fetch-invitations.service';
import { InvitationsExpandedIdManager } from './services/invitations-expanded-id-manager/invitations-expanded-id-manager.service';

@UntilDestroy()
@Component({
    selector: 'dsh-invitations',
    templateUrl: './invitations.component.html',
    providers: [FetchInvitationsService, InvitationsExpandedIdManager],
})
export class InvitationsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        untilDestroyed(this),
        shareReplay(1)
    );
    invitations$ = this.fetchInvitationsService.invitations$;
    lastUpdated$ = this.fetchInvitationsService.lastUpdated$;
    isLoading$ = this.fetchInvitationsService.isLoading$;

    constructor(
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private organizationsService: OrganizationsService,
        private route: ActivatedRoute,
        private fetchInvitationsService: FetchInvitationsService
    ) {}

    @ignoreBeforeCompletion
    createInvitation() {
        return this.organization$
            .pipe(
                first(),
                switchMap(({ id: orgId }) =>
                    this.dialog
                        .open<CreateInvitationDialogComponent, CreateInvitationDialogData, BaseDialogResponseStatus>(
                            CreateInvitationDialogComponent,
                            { ...this.dialogConfig.large, data: { orgId } }
                        )
                        .afterClosed()
                ),
                filter((r) => r === BaseDialogResponseStatus.SUCCESS),
                untilDestroyed(this)
            )
            .subscribe(() => this.refresh());
    }

    refresh() {
        this.fetchInvitationsService.load();
    }
}
