import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { walletsToOptions } from '@dsh/app/shared/components/inputs/wallet-autocomplete-field/utils/wallets-to-options';
import { coerceBoolean } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-wallet-autocomplete-field',
    templateUrl: 'wallet-autocomplete-field.component.html',
})
export class WalletAutocompleteFieldComponent {
    @Input() control: FormControl;

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions), untilDestroyed(this), shareReplay(1));

    @Input() @coerceBoolean required = false;

    constructor(private walletService: WalletService) {}
}
