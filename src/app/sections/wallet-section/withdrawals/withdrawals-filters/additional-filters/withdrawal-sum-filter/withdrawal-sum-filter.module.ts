import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { WithdrawalSumFilterComponent } from './withdrawal-sum-filter.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, TranslocoModule, MatFormFieldModule, MatInputModule],
    declarations: [WithdrawalSumFilterComponent],
    exports: [WithdrawalSumFilterComponent],
})
export class WithdrawalSumFilterModule {}
