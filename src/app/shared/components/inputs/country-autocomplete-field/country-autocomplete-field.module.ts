import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CountriesModule } from '@dsh/api';
import { SelectSearchFieldModule } from '@dsh/components/form-controls/select-search-field';

import { CountryAutocompleteFieldComponent } from './countries-autocomplete-field.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        SelectSearchFieldModule,
        CountriesModule,
    ],
    declarations: [CountryAutocompleteFieldComponent],
    exports: [CountryAutocompleteFieldComponent],
})
export class CountryAutocompleteFieldModule {}
