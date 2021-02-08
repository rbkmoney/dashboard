import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, of } from 'rxjs';
import { catchError, filter, first, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { mapToTimestamp, progress } from '@dsh/operators';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { CreateInvitationDialogComponent } from './components/create-invitation-dialog/create-invitation-dialog.component';
import { CreateInvitationDialogData } from './components/create-invitation-dialog/types/create-invitation-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-invitations',
    templateUrl: './invitations.component.html',
})
export class InvitationsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        untilDestroyed(this),
        shareReplay(1)
    );
    invitations$ = defer(() => this.loadInvitations$).pipe(
        switchMapTo(this.route.params),
        switchMap(({ orgId }) =>
            this.organizationsService.listInvitations(orgId).pipe(
                pluck('result'),
                catchError((err) => {
                    this.errorService.error(err);
                    return of([]);
                })
            )
        ),
        untilDestroyed(this),
        shareReplay(1)
    );
    lastUpdated$ = this.invitations$.pipe(mapToTimestamp, untilDestroyed(this), shareReplay(1));
    isLoading$ = defer(() => progress(this.loadInvitations$, this.invitations$)).pipe(
        untilDestroyed(this),
        shareReplay(1)
    );

    private loadInvitations$ = new BehaviorSubject<void>(undefined);

    constructor(
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private organizationsService: OrganizationsService,
        private route: ActivatedRoute,
        private errorService: ErrorService
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
                            { ...this.dialogConfig.medium, data: { orgId } }
                        )
                        .afterClosed()
                ),
                filter((r) => r === BaseDialogResponseStatus.SUCCESS),
                untilDestroyed(this)
            )
            .subscribe(() => this.refresh());
    }

    refresh() {
        this.loadInvitations$.next();
    }
}
