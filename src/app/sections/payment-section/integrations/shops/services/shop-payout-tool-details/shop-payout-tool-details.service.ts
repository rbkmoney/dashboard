import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { PayoutTool } from '@dsh/api-codegen/capi';
import { PayoutsService } from '@dsh/api/payouts';

import { PayoutToolParams } from '../../shops-list/shop-details/types/payout-tool-params';

@UntilDestroy()
@Injectable()
export class ShopPayoutToolDetailsService {
    shopPayoutTool$: Observable<PayoutTool>;
    errorOccurred$: Observable<boolean>;
    isLoading$ = defer(() => this._isLoading$.asObservable());

    private getPayoutTool$ = new Subject<PayoutToolParams>();
    private error$ = new BehaviorSubject<boolean>(false);
    private payoutTool$ = new ReplaySubject<PayoutTool>(1);
    private _isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private payoutsService: PayoutsService) {
        this.shopPayoutTool$ = this.payoutTool$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();

        this.getPayoutTool$
            .pipe(
                tap(() => this.error$.next(false)),
                distinctUntilChanged(),
                tap(() => this._isLoading$.next(true)),
                switchMap((payoutToolParams) =>
                    payoutToolParams
                        ? this.payoutsService
                              .getPayoutToolByID(payoutToolParams.contractID, payoutToolParams.payoutToolID)
                              .pipe(
                                  catchError((e) => {
                                      console.error(e);
                                      this.error$.next(true);
                                      return of('error');
                                  })
                              )
                        : of(null)
                ),
                tap(() => this._isLoading$.next(false)),
                filter((result) => result !== 'error'),
                untilDestroyed(this)
            )
            .subscribe((payoutTool: PayoutTool) => {
                this.payoutTool$.next(payoutTool);
            });
    }

    requestPayoutTool(params: PayoutToolParams): void {
        this.getPayoutTool$.next(params);
    }
}
