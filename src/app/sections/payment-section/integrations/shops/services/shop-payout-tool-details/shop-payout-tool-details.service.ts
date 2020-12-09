import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { PayoutsService } from '@dsh/api/payouts';

import { PayoutTool } from '@dsh/api-codegen/capi';
import { PayoutToolParams } from '../../shops-list/shop-details/types/payout-tool-params';

@UntilDestroy()
@Injectable()
export class ShopPayoutToolDetailsService {
    shopPayoutTool$: Observable<PayoutTool>;
    errorOccurred$: Observable<boolean>;

    private getPayoutTool$ = new Subject<PayoutToolParams>();
    private error$ = new BehaviorSubject<boolean>(false);
    private payoutTool$ = new ReplaySubject<PayoutTool>(1);

    constructor(private payoutsService: PayoutsService) {
        this.shopPayoutTool$ = this.payoutTool$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();

        this.getPayoutTool$
            .pipe(
                tap(() => this.error$.next(false)),
                distinctUntilChanged(),
                switchMap(({ contractID, payoutToolID }) =>
                    this.payoutsService.getPayoutToolByID(contractID, payoutToolID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.error$.next(true);
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error'),
                untilDestroyed(this)
            )
            .subscribe((payoutTool: PayoutTool) => this.payoutTool$.next(payoutTool as PayoutTool));
    }

    requestPayoutTool(params: PayoutToolParams): void {
        this.getPayoutTool$.next(params);
    }
}
