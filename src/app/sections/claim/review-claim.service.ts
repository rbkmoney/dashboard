import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';

import { ClaimsService } from '../../api';
import { RouteParamClaimService } from './route-param-claim.service';
import { ReceiveClaimService } from './receive-claim.service';
import { switchMap, map, shareReplay, filter, pluck, catchError, tap } from 'rxjs/operators';
import { ConfirmActionDialogComponent } from '../../confirm-action-dialog';
import { UIError } from '../ui-error';
import { progress } from '../../custom-operators';

@Injectable()
export class ReviewClaimService {
    private reviewClaim$: Subject<void> = new Subject();
    private error$: BehaviorSubject<UIError> = new BehaviorSubject({ hasError: false });

    reviewAvailable$: Observable<boolean> = this.receiveClaimService.claim$.pipe(
        map(({ status }) => status === 'pending'),
        shareReplay(1)
    );
    errorCode$: Observable<string> = this.error$.pipe(
        filter(err => err.hasError),
        pluck('code')
    );
    inProgress$: Observable<boolean> = progress(this.reviewClaim$, this.error$);

    constructor(
        private claimsApiService: ClaimsService,
        private routeParamClaimService: RouteParamClaimService,
        private receiveClaimService: ReceiveClaimService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.reviewClaim$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap(() =>
                    this.dialog
                        .open(ConfirmActionDialogComponent)
                        .afterClosed()
                        .pipe(filter(r => r === 'confirm'))
                ),
                switchMap(() => this.routeParamClaimService.claim$),
                switchMap(({ id, revision }) =>
                    this.claimsApiService.requestReviewClaimByID(id, revision).pipe(
                        catchError(ex => {
                            console.error(ex);
                            const error = { hasError: true, code: 'requestReviewClaimByIDFailed' };
                            this.error$.next(error);
                            return of(error);
                        })
                    )
                )
            )
            .subscribe(() => {
                this.receiveClaimService.receiveClaim();
                this.snackBar.open(this.transloco.translate('reviewed', null, 'claim|scoped'), 'OK', {
                    duration: 2000
                });
            });
        this.errorCode$.subscribe(code =>
            this.snackBar.open(this.transloco.translate(`errors.${code}`), 'OK', {
                duration: 5000
            })
        );
    }

    reviewClaim() {
        this.reviewClaim$.next();
    }
}
