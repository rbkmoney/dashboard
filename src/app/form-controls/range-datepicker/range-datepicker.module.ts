import { NgModule } from '@angular/core';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatNativeDateModule, MatMenuModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { RangeDatepickerComponent } from './range-datepicker.component';
import { ButtonToggleModule } from '../../button-toggle';

@NgModule({
    imports: [
        SatDatepickerModule,
        SatNativeDateModule,
        MatNativeDateModule,
        MatMenuModule,
        MatIconModule,
        ButtonToggleModule,
        FlexLayoutModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        TranslocoModule
    ],
    declarations: [RangeDatepickerComponent],
    exports: [RangeDatepickerComponent]
})
export class RangeDatepickerModule {}
