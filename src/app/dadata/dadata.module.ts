import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DaDataService } from './dadata.service';
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
        MatAutocompleteModule
    ],
    declarations: [DaDataAutocompleteComponent, HighlightSearchPipe],
    entryComponents: [DaDataAutocompleteComponent],
    providers: [DaDataService],
    exports: [DaDataAutocompleteComponent]
})
export class DaDataModule {}
