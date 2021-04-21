import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { Claim } from '@dsh/api-codegen/claim-management';

import { booleanDelay } from '../../custom-operators';
import { RouteParamClaimService } from './route-param-claim.service';

const POLLING_PERIOD = 5000;

@UntilDestroy()
@Injectable()
export class ReceiveClaimService {
    private claimState$ = new BehaviorSubject(null);
    private receiveClaimError$ = new BehaviorSubject(false);
    private receiveClaim$ = new Subject();

    claim$: Observable<Claim> = this.claimState$.pipe(
        filter((s) => !!s),
        shareReplay(1)
    );

    claimReceived$ = this.claim$.pipe(
        booleanDelay(),
        map((r) => !r)
    );

    error$: Observable<any> = this.receiveClaimError$.asObservable();

    constructor(
        private routeParamClaimService: RouteParamClaimService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receiveClaim$
            .pipe(
                switchMap(() => timer(0, POLLING_PERIOD)),
                switchMap(() => this.routeParamClaimService.claim$),
                untilDestroyed(this)
            )
            .subscribe(
                (claim) => this.claimState$.next(claim),
                (err) => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                    this.receiveClaimError$.next(true);
                }
            );
    }

    receiveClaim() {
        this.receiveClaim$.next();
    }
}
