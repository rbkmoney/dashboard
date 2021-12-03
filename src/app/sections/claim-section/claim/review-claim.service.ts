import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { ContextService } from '@dsh/app/shared/services/context';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { UiError } from '../../ui-error';
import { ReceiveClaimService } from './receive-claim.service';
import { RouteParamClaimService } from './route-param-claim.service';

@UntilDestroy()
@Injectable()
export class ReviewClaimService {
    private reviewClaim$: Subject<void> = new Subject();
    private error$: BehaviorSubject<UiError> = new BehaviorSubject({ hasError: false });
    private progress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    reviewAvailable$: Observable<boolean> = this.receiveClaimService.claim$.pipe(
        map(({ status }) => status === 'pending'),
        shareReplay(1)
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorCode$: Observable<string> = this.error$.pipe(
        filter((err) => err.hasError),
        pluck('code')
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$: Observable<boolean> = this.progress$.asObservable();

    constructor(
        private claimsApiService: ClaimsService,
        private routeParamClaimService: RouteParamClaimService,
        private receiveClaimService: ReceiveClaimService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private contextService: ContextService
    ) {
        this.reviewClaim$
            .pipe(
                tap(() => {
                    this.error$.next({ hasError: false });
                    this.progress$.next(true);
                }),
                switchMap(() =>
                    this.dialog
                        .open(ConfirmActionDialogComponent)
                        .afterClosed()
                        .pipe(
                            tap((r) => {
                                if (r === 'cancel') {
                                    this.progress$.next(false);
                                }
                            }),
                            filter((r) => r === 'confirm')
                        )
                ),
                switchMap(() => this.routeParamClaimService.claim$),
                withLatestFrom(this.contextService.organization$),
                switchMap(([{ id, revision }, org]) =>
                    this.claimsApiService.requestReviewClaimByID(org.id, id, revision).pipe(
                        catchError((ex) => {
                            this.progress$.next(false);
                            console.error(ex);
                            const error = { hasError: true, code: 'requestReviewClaimByIDFailed' };
                            this.error$.next(error);
                            return of(error);
                        })
                    )
                ),
                untilDestroyed(this)
            )
            .subscribe(() => {
                this.receiveClaimService.receiveClaim();
                this.snackBar.open(this.transloco.translate('reviewed', null, 'claim'), 'OK', {
                    duration: 2000,
                });
            });
        this.errorCode$.subscribe((code) =>
            this.snackBar.open(this.transloco.translate(`errors.${code}`), 'OK', {
                duration: 5000,
            })
        );
    }

    reviewClaim() {
        this.reviewClaim$.next();
    }
}
