import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { walletsToOptions } from '@dsh/app/shared/components/inputs/wallet-autocomplete-field/utils/wallets-to-options';

@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
})
export class WalletAutocompleteFieldComponent {
    @Input() control: FormControl;

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions), shareReplay(1));

    protected _required = false;
    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    constructor(private walletService: WalletService) {}
}
