import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, timer } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '../../../api';
import { AmountResult } from '../../../api-codegen/anapi';

@Injectable()
export class BalancesService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    balances$: Observable<AmountResult[]>;

    balancesCount$: Observable<number>;

    constructor(private analyticsService: AnalyticsService, private route: ActivatedRoute) {
        this.balances$ = timer(0, 60000).pipe(
            withLatestFrom(this.route.params),
            pluck('1', 'realm'),
            switchMap((paymentInstitutionRealm) =>
                this.analyticsService.getCurrentBalances({ paymentInstitutionRealm }).pipe(
                    catchError((ex) => {
                        console.error(ex);
                        return of({ result: [] });
                    })
                )
            ),
            pluck('result'),
            takeUntil(this.destroy$),
            shareReplay(1)
        );
        this.balancesCount$ = this.balances$.pipe(pluck('length'), shareReplay(1));
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
