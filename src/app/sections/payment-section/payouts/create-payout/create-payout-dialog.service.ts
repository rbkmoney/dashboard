import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PayoutsService, ShopService } from '../../../../api';
import { toPayoutParams } from './to-payout-params';

@Injectable()
export class CreatePayoutDialogService {
    private currentShopID$ = new Subject<string>();

    private create$: Subject<any> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private created$ = new Subject();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    payoutCreated$ = this.created$.asObservable();

    payoutTools$ = this.currentShopID$.pipe(
        switchMap((shopID) => this.shopsService.shops$.pipe(map((shops) => shops.find(({ id }) => id === shopID)))),
        switchMap(({ contractID }) => this.payoutsService.getPayoutTools(contractID)),
        map((tools) => tools.filter((tool) => tool.details.detailsType === 'PayoutToolDetailsWalletInfo')),
        shareReplay(1)
    );

    hasPayoutTools$ = this.payoutTools$.pipe(
        map((tools) => !!tools.length),
        shareReplay(1)
    );

    constructor(private shopsService: ShopService, private payoutsService: PayoutsService) {
        merge(this.payoutTools$, this.hasPayoutTools$).subscribe();
        this.create$
            .pipe(
                tap(() => {
                    this.loading$.next(true);
                    this.created$.next(false);
                }),
                map(toPayoutParams),
                switchMap((params) =>
                    this.payoutsService.createPayout(params).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => {
                this.loading$.next(false);
                this.created$.next(true);
            });
    }

    changeShopID(id: string) {
        this.currentShopID$.next(id);
    }

    createPayout(formValue: any) {
        this.create$.next(formValue);
    }
}
