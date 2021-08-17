import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { CategoryAutocompleteFieldModule } from '@dsh/app/shared/components/inputs/category-autocomplete-field';

import { ShopDetailsFormComponent } from './shop-details-form.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        CategoryAutocompleteFieldModule,
        TranslocoModule,
        FlexModule,
    ],
    declarations: [ShopDetailsFormComponent],
    exports: [ShopDetailsFormComponent],
})
export class ShopDetailsFormModule {}
