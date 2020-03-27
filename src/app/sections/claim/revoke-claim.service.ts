import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

import { ReceiveClaimService } from './receive-claim.service';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog';
import { RouteParamClaimService } from './route-param-claim.service';

@Injectable()
export class RevokeClaimService {
    private revokeClaim$ = new Subject();

    revokeAvailable$ = this.receiveClaimService.claim$.pipe(
        map(({ status }) => status !== 'revoked' && status !== 'denied' && status !== 'accepted')
    );

    constructor(
        private routeParamClaimService: RouteParamClaimService,
        private receiveClaimService: ReceiveClaimService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private dialog: MatDialog
    ) {
        this.revokeClaim$
            .pipe(
                switchMap(() => this.routeParamClaimService.claim$.pipe(first())),
                switchMap(({ id, revision }) => this.openRevokeClaimDialog(id, revision))
            )
            .subscribe(() => {
                this.receiveClaimService.receiveClaim();
                this.snackBar.open(this.transloco.translate('revoked', null, 'claim|scoped'), 'OK', {
                    duration: 2000
                });
            });
    }

    revokeClaim() {
        this.revokeClaim$.next();
    }

    private openRevokeClaimDialog(claimId: number, revision: number) {
        return this.dialog
            .open(RevokeClaimDialogComponent, {
                disableClose: true,
                width: '500px',
                data: { claimId, revision }
            })
            .afterClosed()
            .pipe(filter(r => r === 'revoked'));
    }
}
