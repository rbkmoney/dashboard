import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filters/filter';
import { FormatInputModule } from '@dsh/components/form-controls';

import { CardBinPanFilterComponent } from './card-bin-pan-filter.component';

@NgModule({
    imports: [
        CommonModule,
        FilterModule,
        MatFormFieldModule,
        FormatInputModule,
        ReactiveFormsModule,
        TranslocoModule,
        FlexLayoutModule,
    ],
    declarations: [CardBinPanFilterComponent],
    exports: [CardBinPanFilterComponent],
})
export class CardBinPanFilterModule {}
