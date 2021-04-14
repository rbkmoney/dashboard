import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { filter, map, take } from 'rxjs/operators';

import { Wallet } from '@dsh/api-codegen/wallet-api';
import { AutocompleteVirtualScrollComponent } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/autocomplete-virtual-scroll.component';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { WalletOptionsSelectionService } from '../../../../services/wallet-options-selection/wallet-options-selection.service';
import { MainFilters } from './types/main-filters';

@UntilDestroy()
@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WalletOptionsSelectionService],
})
export class MainFiltersComponent implements OnInit {
    @Input() form: FormGroup<MainFilters>;

    @Input() contentWindow: HTMLElement;

    @ViewChild('autocomplete', { static: false }) autocomplete: AutocompleteVirtualScrollComponent;

    options$ = this.walletOptionsService.options$;
    innerWalletControl = this.walletOptionsService.control;

    private get walletControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('walletID'))) {
            throw new Error(`Can't find walletID control. FormGroup or FormControl doesn't exist`);
        }
        return (this.form.get('walletID') as AbstractControl) as FormControl;
    }

    constructor(private walletOptionsService: WalletOptionsSelectionService) {}

    ngOnInit() {
        const formWalletID = this.walletControl.value as string | undefined;
        this.options$
            .pipe(
                map((wallets: BaseOption<string>[]) => {
                    return wallets.find(({ id }: BaseOption<string>) => id === formWalletID);
                }),
                take(1),
                filter(Boolean)
            )
            .subscribe((wallet: BaseOption<string>) => {
                this.innerWalletControl.setValue(wallet);
            });

        this.walletOptionsService.selectedWallet$
            .pipe(
                map((wallet: Wallet | null) => (isNil(wallet) ? '' : wallet.id)),
                untilDestroyed(this)
            )
            .subscribe((walletID: string) => {
                this.walletControl.setValue(walletID);
            });
    }

    clearWalletFilter(): void {
        this.autocomplete.clearValue(false);
    }
}
