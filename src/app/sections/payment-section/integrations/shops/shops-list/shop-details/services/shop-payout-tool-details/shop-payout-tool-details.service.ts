import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { PayoutTool } from '@dsh/api-codegen/capi';
import { PayoutsService } from '@dsh/api/payouts';

import { PayoutToolParams } from '../../types/payout-tool-params';

@Injectable()
export class ShopPayoutToolDetailsService {
    shopPayoutTool$: Observable<PayoutTool>;
    errorOccurred$: Observable<boolean>;

    private getPayoutTool$: Subject<PayoutToolParams> = new Subject();
    private error$: Subject<any> = new BehaviorSubject(false);
    private payoutTool$: Subject<PayoutTool> = new Subject();

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
                filter((result) => result !== 'error')
            )
            .subscribe((payoutTool) => this.payoutTool$.next(payoutTool as PayoutTool));
    }

    getPayoutTool(params: PayoutToolParams): void {
        this.getPayoutTool$.next(params);
    }
}
