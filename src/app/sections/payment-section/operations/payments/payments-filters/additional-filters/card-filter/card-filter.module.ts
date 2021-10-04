import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

import { FormatInputModule } from '@dsh/components/form-controls';

import { CardBinPanFilterModule } from '../../card-bin-pan-filter';
import { CardFilterComponent } from './card-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        CardBinPanFilterModule,
        MatFormFieldModule,
        FormatInputModule,
    ],
    declarations: [CardFilterComponent],
    exports: [CardFilterComponent],
})
export class CardFilterModule {}
