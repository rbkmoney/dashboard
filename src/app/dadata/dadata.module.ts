import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { DaDataService } from './dadata.service';
import { DaDataAutocompleteComponent } from './dadata.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        MatAutocompleteModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule
    ],
    declarations: [DaDataAutocompleteComponent],
    entryComponents: [DaDataAutocompleteComponent],
    providers: [DaDataService],
    exports: [DaDataAutocompleteComponent]
})
export class DaDataModule {}
