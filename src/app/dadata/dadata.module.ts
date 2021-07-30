import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DaDataModule as DaDataApiModule } from '@dsh/api/dadata';
import { FormControlsModule } from '@dsh/components/form-controls';

import { DaDataAutocompleteComponent } from './dadata.component';
import { HighlightSearchPipe } from './highlight.pipe';

@NgModule({
    imports: [
        HttpClientModule,
        MatAutocompleteModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        DaDataApiModule,
        FormControlsModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [DaDataAutocompleteComponent, HighlightSearchPipe],
    exports: [DaDataAutocompleteComponent],
})
export class DaDataModule {}
