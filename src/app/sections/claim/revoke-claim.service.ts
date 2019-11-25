import { Injectable } from '@angular/core';
import { Subject, combineLatest, forkJoin, of, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, first, filter, tap, map } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { ConfirmActionDialogComponent } from '../../confirm-action-dialog';
import { ReceiveClaimService } from './receive-claim.service';
import { ClaimsService } from '../../api/claims';

@Injectable()
export class RevokeClaimService {
    private inProcessState = new BehaviorSubject(false);
    private revokeClaim$ = new Subject();

    inProcess$ = this.inProcessState.asObservable();
    revokeAvailable$ = this.receiveClaimService.claim$.pipe(
        map(({ status }) => status !== 'revoked' && status !== 'denied' && status !== 'accepted')
    );

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private claimsApiService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private dialog: MatDialog
    ) {
        combineLatest(this.receiveClaimService.claim$.pipe(first()), this.revokeClaim$)
            .pipe(
                switchMap(([claim]) => forkJoin(of(claim), this.openConfirmDialog())),
                switchMap(([{ id, revision }]) =>
                    this.claimsApiService.revokeClaimByID(id, revision).pipe(
                        catchError(ex => {
                            console.error(ex);
                            this.inProcessState.next(false);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            return of();
                        })
                    )
                )
            )
            .subscribe(() => {
                this.inProcessState.next(false);
                this.receiveClaimService.receiveClaim();
                this.snackBar.open(this.transloco.translate('revoked', null, 'claim|scoped'), 'OK', {
                    duration: 2000
                });
            });
    }

    revokeClaim() {
        this.revokeClaim$.next();
        this.inProcessState.next(true);
    }

    private openConfirmDialog() {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                tap(dialogResult => dialogResult === 'cancel' && this.inProcessState.next(false)),
                filter(r => r === 'confirm')
            );
    }
}
