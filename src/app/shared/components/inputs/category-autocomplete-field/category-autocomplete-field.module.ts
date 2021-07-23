import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteFieldModule } from '@dsh/components/form-controls/autocomplete-field';

import { CategoryAutocompleteFieldComponent } from './category-autocomplete-field.component';

@NgModule({
    imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, AutocompleteFieldModule],
    declarations: [CategoryAutocompleteFieldComponent],
    exports: [CategoryAutocompleteFieldComponent],
})
export class CategoryAutocompleteFieldModule {}
