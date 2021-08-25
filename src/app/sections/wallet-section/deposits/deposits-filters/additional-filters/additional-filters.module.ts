import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { DepositStatusFilterModule } from './deposit-status-filter/deposit-status-filter.module';
import { DepositSumFilterModule } from './deposit-sum-filter';
import { MainInfoFiltersModule } from './main-info-filters';

@NgModule({
    declarations: [DialogFiltersComponent],
    entryComponents: [DialogFiltersComponent],
    imports: [
        DialogModule,
        FlexModule,
        MatDividerModule,
        MainInfoFiltersModule,
        DepositSumFilterModule,
        TranslocoModule,
        DepositStatusFilterModule,
        ButtonModule,
    ],
})
export class AdditionalFiltersModule {}
