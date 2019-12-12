import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { switchMap, map, filter, shareReplay } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

import { Claim } from '../../api-codegen/claim-management';
import { booleanDelay } from '../../custom-operators';
import { RouteParamClaimService } from './route-param-claim.service';

@Injectable()
export class ReceiveClaimService {
    private claimState$ = new BehaviorSubject(null);
    private receiveClaimError$ = new BehaviorSubject(false);
    private receiveClaim$ = new Subject();

    claim$: Observable<Claim> = this.claimState$.pipe(
        filter(s => !!s),
        shareReplay(1)
    );

    claimReceived$ = this.claim$.pipe(
        booleanDelay(),
        map(r => !r)
    );

    error$: Observable<any> = this.receiveClaimError$.asObservable();

    receiveClaim() {
        this.receiveClaim$.next();
    }

    constructor(
        private routeParamClaimService: RouteParamClaimService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receiveClaim$.pipe(switchMap(() => this.routeParamClaimService.claim$)).subscribe(
            claim => this.claimState$.next(claim),
            err => {
                console.error(err);
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                this.receiveClaimError$.next(true);
            }
        );
    }
}
