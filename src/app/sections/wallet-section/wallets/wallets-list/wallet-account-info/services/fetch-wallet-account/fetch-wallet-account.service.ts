import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, delay, shareReplay, switchMap } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { WalletAccount } from '@dsh/api-codegen/wallet-api';
import { errorTo, progressTo } from '@dsh/utils';

@UntilDestroy()
@Injectable()
export class FetchWalletAccountService {
    walletAccount$: Observable<WalletAccount> = defer(() => this.fetchWalletAccount$).pipe(
        switchMap((walletID) =>
            this.walletService
                .getWalletAccount(walletID)
                .pipe(delay(3000))
                .pipe(
                    progressTo(this.loading$),
                    errorTo(this.error$),
                    catchError(() => EMPTY)
                )
        ),
        untilDestroyed(this),
        shareReplay(1)
    );

    isLoading$: Observable<number>;

    error$ = new BehaviorSubject<boolean>(false);

    private loading$ = new BehaviorSubject<number>(0);

    private fetchWalletAccount$ = new ReplaySubject<string>();

    constructor(private walletService: WalletService) {
        this.isLoading$ = this.loading$.asObservable().pipe(shareReplay(1));
    }

    fetchWalletAccount(walletID: string): void {
        this.fetchWalletAccount$.next(walletID);
    }
}
