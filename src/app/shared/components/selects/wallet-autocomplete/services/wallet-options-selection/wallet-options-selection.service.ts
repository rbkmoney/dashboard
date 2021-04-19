import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { Wallet } from '@dsh/api-codegen/wallet-api';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

@UntilDestroy()
@Injectable()
export class WalletOptionsSelectionService {
    control = new FormControl();
    options$: Observable<BaseOption<string>[]>;
    selectedWallet$: Observable<Wallet | null>;

    private innerSelectedWallet$ = new ReplaySubject<Wallet>(1);

    constructor(private walletService: WalletService) {
        this.initWalletOptions();
        this.initSelectedWallet();
    }

    clearValue() {
        this.control.setValue(null);
    }

    private initWalletOptions(): void {
        this.options$ = this.walletService.wallets$.pipe(
            map((walletsList: Wallet[]) => {
                return walletsList.map((wallet: Wallet) => {
                    return {
                        id: wallet.id,
                        label: wallet.name,
                    };
                });
            }),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initSelectedWallet(): void {
        this.control.valueChanges
            .pipe(
                withLatestFrom(this.walletService.wallets$),
                map(([selected, walletsList]: [BaseOption<string> | null, Wallet[]]) => {
                    if (isNil(selected)) {
                        return null;
                    }
                    return walletsList.find((wallet: Wallet) => wallet.id === selected.id);
                }),
                map((wallet: Wallet | undefined | null) => (isNil(wallet) ? null : wallet)),
                shareReplay(SHARE_REPLAY_CONF),
                untilDestroyed(this)
            )
            .subscribe((selectedWallet: Wallet | null) => {
                this.innerSelectedWallet$.next(selectedWallet);
            });

        this.selectedWallet$ = this.innerSelectedWallet$.asObservable();
    }
}
