import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ButtonModule } from '@dsh/components/buttons';

import { AutocompleteFieldComponent } from './autocomplete-field.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        ButtonModule,
    ],
    declarations: [AutocompleteFieldComponent],
    exports: [AutocompleteFieldComponent],
})
export class AutocompleteFieldModule {}
