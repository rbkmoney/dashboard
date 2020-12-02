import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteVirtualScrollComponent } from './autocomplete-virtual-scroll.component';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ScrollingModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
    ],
    declarations: [AutocompleteVirtualScrollComponent],
    exports: [AutocompleteVirtualScrollComponent],
})
export class AutocompleteVirtualScrollModule {}
