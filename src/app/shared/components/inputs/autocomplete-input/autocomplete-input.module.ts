import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AutocompleteInputComponent } from './autocomplete-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@dsh/components/buttons';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        ButtonModule
    ],
    declarations: [AutocompleteInputComponent],
    exports: [AutocompleteInputComponent],
})
export class AutocompleteInputModule {}
