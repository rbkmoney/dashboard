import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteVirtualScrollComponent } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/autocomplete-virtual-scroll.component';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ScrollingModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    declarations: [AutocompleteVirtualScrollComponent],
    exports: [AutocompleteVirtualScrollComponent],
})
export class AutocompleteVirtualScrollModule {}
