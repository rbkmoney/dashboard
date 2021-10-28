import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { SelectSearchFieldModule } from '@dsh/components/form-controls/select-search-field';

import { CurrencyAutocompleteFieldComponent } from './currency-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, SelectSearchFieldModule],
    declarations: [CurrencyAutocompleteFieldComponent],
    exports: [CurrencyAutocompleteFieldComponent],
})
export class CurrencyAutocompleteFieldModule {}
