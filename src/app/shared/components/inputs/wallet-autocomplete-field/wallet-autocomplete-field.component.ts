import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';
import isNil from 'lodash-es/isNil';

import { WalletService } from '@dsh/api';
import { Wallet } from '@dsh/api-codegen/wallet-api';
import { coerceBoolean } from '@dsh/utils';

import { walletsToOptions } from './utils';

type WalletId = string;
type WalletName = string;
type DisplayWithFn = (value: WalletId) => string;

const toMap = (wallets: Wallet[]): Map<WalletId, WalletName> => {
    const result = new Map<WalletId, WalletName>();
    for (const { id, name } of wallets) {
        result.set(id, name);
    }
    return result;
};

const walletsToDisplayWithFn = (wallets: Wallet[]): DisplayWithFn => {
    const map = toMap(wallets);
    return (value: WalletId): string => {
        // TODO fix this
        if (isNil(value)) {
            return null;
        }
        return `${value} - ${map.get(value)}`;
    };
};

@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
    providers: [provideValueAccessor(WalletAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletAutocompleteFieldComponent extends WrappedFormControlSuperclass<WalletId> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions));
    displayWithFn$ = this.walletService.wallets$.pipe(map(walletsToDisplayWithFn));

    constructor(injector: Injector, private walletService: WalletService) {
        super(injector);
    }
}
