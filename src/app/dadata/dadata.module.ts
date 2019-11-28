import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { DaDataAutocompleteComponent } from './dadata.component';
import { HighlightSearchPipe } from './highlight.pipe';
import { DaDataModule as DaDataApiModule } from '../api';

@NgModule({
    imports: [
        HttpClientModule,
        MatAutocompleteModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        DaDataApiModule,
        TranslocoModule
    ],
    declarations: [DaDataAutocompleteComponent, HighlightSearchPipe],
    entryComponents: [DaDataAutocompleteComponent],
    exports: [DaDataAutocompleteComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'dadata' }]
})
export class DaDataModule {}
