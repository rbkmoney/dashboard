import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { ButtonToggleModule } from '../../button-toggle';
import { RangeDatePipe } from './range-date.pipe';
import { RangeDatepickerComponent } from './range-datepicker.component';

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
        TranslocoModule,
        MatDividerModule
    ],
    declarations: [RangeDatepickerComponent, RangeDatePipe],
    exports: [RangeDatepickerComponent]
})
export class RangeDatepickerModule {}
