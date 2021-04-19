import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { filter, map, take } from 'rxjs/operators';

import { Wallet, WithdrawalStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { AutocompleteVirtualScrollComponent } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/autocomplete-virtual-scroll.component';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { WalletOptionsSelectionService } from '../../../../shared/components/selects/wallet-autocomplete/services/wallet-options-selection/wallet-options-selection.service';
import { SearchFormService } from './search-form.service';

@UntilDestroy()
@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService, WalletOptionsSelectionService],
})
export class SearchFormComponent implements OnInit {
    @ViewChild('floatPanel', { static: false, read: ElementRef }) contentRef: ElementRef<HTMLElement>;

    @ViewChild('autocomplete', { static: false }) autocomplete: AutocompleteVirtualScrollComponent;

    form = this.searchFormService.form;

    withdrawalStatuses: WithdrawalStatus.StatusEnum[] = ['Pending', 'Succeeded', 'Failed'];

    expanded = false;

    options$ = this.walletOptionsService.options$;
    innerWalletControl = this.walletOptionsService.control;

    get contentWindow(): HTMLElement | undefined {
        return this.contentRef?.nativeElement?.parentElement;
    }

    private get walletControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('walletID'))) {
            throw new Error(`Can't find walletID control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get('walletID') as FormControl;
    }

    constructor(
        private searchFormService: SearchFormService,
        private walletOptionsService: WalletOptionsSelectionService
    ) {}

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

    reset(): void {
        this.searchFormService.reset();
        this.autocomplete.clearValue(false);
    }
}
