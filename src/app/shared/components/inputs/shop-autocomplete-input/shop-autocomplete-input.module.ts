import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ShopModule } from '@dsh/api';
import { AutocompleteInputModule } from '@dsh/components/form-controls/autocomplete-input';

import { ShopAutocompleteInputComponent } from './shop-autocomplete-input.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AutocompleteInputModule,
        ShopModule,
    ],
    declarations: [ShopAutocompleteInputComponent],
    exports: [ShopAutocompleteInputComponent],
})
export class ShopAutocompleteInputModule {}
