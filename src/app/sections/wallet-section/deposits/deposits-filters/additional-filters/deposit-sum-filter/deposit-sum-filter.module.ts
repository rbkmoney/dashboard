import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

import { FormatInputModule } from '@dsh/components/form-controls';

import { DepositSumFilterComponent } from './deposit-sum-filter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormatInputModule,
        FlexLayoutModule,
        TranslocoModule,
        MatFormFieldModule,
    ],
    declarations: [DepositSumFilterComponent],
    exports: [DepositSumFilterComponent],
})
export class DepositSumFilterModule {}
