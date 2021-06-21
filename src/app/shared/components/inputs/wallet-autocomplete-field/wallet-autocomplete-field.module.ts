import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteFieldModule } from '@dsh/components/form-controls/autocomplete-field';

import { WalletAutocompleteFieldComponent } from './wallet-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, AutocompleteFieldModule],
    declarations: [WalletAutocompleteFieldComponent],
    exports: [WalletAutocompleteFieldComponent],
})
export class WalletAutocompleteFieldModule {}
