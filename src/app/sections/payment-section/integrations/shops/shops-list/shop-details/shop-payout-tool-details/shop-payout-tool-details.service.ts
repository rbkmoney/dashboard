import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { PayoutsService } from '../../../../../../../api';
import { PayoutTool } from '../../../../../../../api-codegen/capi';
import { PayoutToolParams } from './payout-tool-params';

@Injectable()
export class ShopPayoutToolDetailsService {
    private getPayoutTool$: Subject<PayoutToolParams> = new Subject();
    private error$: Subject<any> = new BehaviorSubject(false);
    private payoutTool$: Subject<PayoutTool> = new Subject();

    shopPayoutTool$: Observable<PayoutTool> = this.payoutTool$.asObservable();
    errorOccurred$: Observable<boolean> = this.error$.asObservable();

    constructor(private payoutsService: PayoutsService) {
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

    getPayoutTool(params: PayoutToolParams) {
        this.getPayoutTool$.next(params);
    }
}
