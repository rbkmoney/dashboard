import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DaDataService } from './dadata.service';
import { DaDataAutocompleteComponent } from './dadata.component';
import { HighlightSearchPipe } from './highlight.pipe';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        MatAutocompleteModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        FlexLayoutModule
    ],
    declarations: [DaDataAutocompleteComponent, HighlightSearchPipe],
    entryComponents: [DaDataAutocompleteComponent],
    providers: [DaDataService],
    exports: [DaDataAutocompleteComponent]
})
export class DaDataModule {}
