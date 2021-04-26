import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { AutocompleteInputModule } from '@dsh/app/shared/components/inputs/autocomplete-input/autocomplete-input.module';

import { MainFiltersComponent } from './main-filters.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        AutocompleteInputModule,
    ],
    declarations: [MainFiltersComponent],
    exports: [MainFiltersComponent],
})
export class MainFiltersModule {}
