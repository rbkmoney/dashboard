import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ShopModule } from '@dsh/api';
import { SelectSearchFieldModule } from '@dsh/components/form-controls/select-search-field';

import { ShopAutocompleteFieldComponent } from './shop-autocomplete-field.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        SelectSearchFieldModule,
        ShopModule,
    ],
    declarations: [ShopAutocompleteFieldComponent],
    exports: [ShopAutocompleteFieldComponent],
})
export class ShopAutocompleteFieldModule {}
