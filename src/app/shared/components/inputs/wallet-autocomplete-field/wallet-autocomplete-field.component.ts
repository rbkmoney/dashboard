import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { Wallet } from '@dsh/api-codegen/wallet-api';
import { coerceBoolean } from '@dsh/utils';

import { walletsToOptions } from './utils';

@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
    providers: [provideValueAccessor(WalletAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletAutocompleteFieldComponent extends WrappedFormControlSuperclass<string> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions));

    constructor(injector: Injector, private walletService: WalletService) {
        super(injector);
    }

    displayWith(value: Wallet): string {
        return value?.name;
    }
}
