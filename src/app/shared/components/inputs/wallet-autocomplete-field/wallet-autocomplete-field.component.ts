import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { coerceBoolean } from '@dsh/utils';

import { WalletId } from './types';
import { walletsToDisplayWithFn, walletsToOptions } from './utils';

@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
    providers: [provideValueAccessor(WalletAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletAutocompleteFieldComponent extends WrappedFormControlSuperclass<WalletId> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    wallets$ = this.walletService.wallets$;
    options$ = this.wallets$.pipe(map(walletsToOptions));
    displayWithFn$ = this.wallets$.pipe(map(walletsToDisplayWithFn));

    constructor(injector: Injector, private walletService: WalletService) {
        super(injector);
    }
}
