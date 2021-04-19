import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { filter, map, shareReplay, take, tap } from 'rxjs/operators';

import { Wallet } from '@dsh/api-codegen/wallet-api';
import { AutocompleteVirtualScrollComponent } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/autocomplete-virtual-scroll.component';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { WalletOptionsSelectionService } from './services/wallet-options-selection/wallet-options-selection.service';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

@UntilDestroy()
@Component({
    selector: 'dsh-wallet-autocomplete',
    templateUrl: './wallet-autocomplete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WalletOptionsSelectionService],
})
export class WalletAutocompleteComponent implements OnInit {
    @Input() control: FormControl;

    @ViewChild('autocomplete', { static: false }) autocomplete: AutocompleteVirtualScrollComponent;

    options$ = this.walletOptionsService.options$;
    innerWalletControl = this.walletOptionsService.control;

    constructor(private walletOptionsService: WalletOptionsSelectionService) {}

    ngOnInit() {
        const formWalletID = this.control.value as string | undefined;
        this.options$
            .pipe(
                map((wallets: BaseOption<string>[]) => {
                    console.log(wallets, formWalletID)
                    return wallets.find(({ id }: BaseOption<string>) => id === formWalletID);
                }),
                take(1),
                filter(Boolean),
                untilDestroyed(this)
            )
            .subscribe((wallet: BaseOption<string>) => {
                console.log(wallet)
                this.innerWalletControl.setValue(wallet);
            });

        this.walletOptionsService.selectedWallet$
            .pipe(
                tap(d => console.log('wut?', d)),
                map((wallet: Wallet | null) => (isNil(wallet) ? '' : wallet.id)),
                untilDestroyed(this),
                shareReplay(SHARE_REPLAY_CONF)
            )
            .subscribe((walletID: string) => {
                console.log('wallet id is', walletID)
                this.control.setValue(walletID);
            });
    }

    clearWalletFilter(): void {
        this.autocomplete.clearValue(false);
    }
}
