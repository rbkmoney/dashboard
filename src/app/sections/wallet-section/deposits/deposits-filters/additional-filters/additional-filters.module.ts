import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { DepositStatusFilterModule } from './deposit-status-filter';
import { DepositSumFilterModule } from './deposit-sum-filter';
import { MainInfoFiltersModule } from './main-info-filters';

@NgModule({
    declarations: [DialogFiltersComponent],
    imports: [
        DialogModule,
        FlexModule,
        MatDividerModule,
        ButtonModule,
        TranslocoModule,
        MainInfoFiltersModule,
        DepositStatusFilterModule,
        DepositSumFilterModule,
        MatDialogModule,
    ],
})
export class AdditionalFiltersModule {}
