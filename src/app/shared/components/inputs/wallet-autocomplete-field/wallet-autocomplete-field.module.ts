import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { AutocompleteFieldModule } from '@dsh/app/shared/components/inputs/autocomplete-field';

import { WalletAutocompleteFieldComponent } from './wallet-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, AutocompleteFieldModule],
    declarations: [WalletAutocompleteFieldComponent],
    exports: [WalletAutocompleteFieldComponent],
})
export class WalletAutocompleteFieldModule {}
