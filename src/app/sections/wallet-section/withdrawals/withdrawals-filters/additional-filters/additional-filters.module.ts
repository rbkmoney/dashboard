import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { DialogFiltersComponent } from './components';
import { MainInfoFiltersModule } from './main-info-filters';
import { WithdrawalStatusFilterModule } from './withdrawal-status-filter';
import { WithdrawalSumFilterModule } from './withdrawal-sum-filter';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatIconModule,
        MainInfoFiltersModule,
        MatDividerModule,
        WithdrawalStatusFilterModule,
        WithdrawalSumFilterModule,
    ],
    declarations: [DialogFiltersComponent],
})
export class AdditionalFiltersModule {}
