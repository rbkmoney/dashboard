import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonToggleModule } from '@dsh/components/buttons/button-toggle';
import { DaterangeModule } from '@dsh/pipes/daterange';

import { RangeDatepickerComponent } from './range-datepicker.component';

@NgModule({
    imports: [
        MatNativeDateModule,
        MatMenuModule,
        MatIconModule,
        ButtonToggleModule,
        FlexLayoutModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        TranslocoModule,
        MatDividerModule,
        DaterangeModule,
        MatDatepickerModule,
    ],
    declarations: [RangeDatepickerComponent],
    exports: [RangeDatepickerComponent],
})
export class RangeDatepickerModule {}
