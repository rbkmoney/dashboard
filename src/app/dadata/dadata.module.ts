import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { DaDataModule as DaDataApiModule } from '../api';
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
    ],
    declarations: [DaDataAutocompleteComponent, HighlightSearchPipe],
    entryComponents: [DaDataAutocompleteComponent],
    exports: [DaDataAutocompleteComponent],
})
export class DaDataModule {}
