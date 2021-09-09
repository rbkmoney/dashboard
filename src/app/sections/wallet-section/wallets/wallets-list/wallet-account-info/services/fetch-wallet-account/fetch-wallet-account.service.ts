import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { WalletAccount } from '@dsh/api-codegen/wallet-api';
import { ErrorService } from '@dsh/app/shared';
import { shareReplayUntilDestroyed } from '@dsh/operators';
import { errorTo, progressTo } from '@dsh/utils';

@UntilDestroy()
@Injectable()
export class FetchWalletAccountService {
    walletAccount$: Observable<WalletAccount> = defer(() => this.fetchWalletAccount$).pipe(
        switchMap((walletID) =>
            this.walletService.getWalletAccount(walletID).pipe(
                delay(3000),
                progressTo(this.progress$),
                errorTo(this.error$),
                catchError((err) => {
                    this.errorService.error(err, false);
                    return EMPTY;
                })
            )
        ),
        shareReplayUntilDestroyed(this)
    );

    isLoading$: Observable<boolean> = defer(() => this.progress$).pipe(map(Boolean));

    error$ = new BehaviorSubject<boolean>(false);

    private progress$ = new BehaviorSubject<number>(0);

    private fetchWalletAccount$ = new ReplaySubject<string>();

    constructor(private walletService: WalletService, private errorService: ErrorService) {}

    fetchWalletAccount(walletID: string): void {
        this.fetchWalletAccount$.next(walletID);
    }
}
