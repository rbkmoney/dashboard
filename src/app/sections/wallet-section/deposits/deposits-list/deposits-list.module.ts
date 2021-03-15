import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared';
import { DepositDetailsModule as SharedDepositDetailsModule } from '@dsh/app/shared/components/api-model-details/deposit-details/deposit-details.module';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositRowHeaderComponent } from './components/deposit-row-header/deposit-row-header.component';
import { DepositRowComponent } from './components/deposit-row/deposit-row.component';
import { DepositDetailsModule } from './deposit-details';
import { DepositsListComponent } from './deposits-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        DepositDetailsModule,
        ToMajorModule,
        DepositDetailsModule,
        DepositDetailsModule,
        DepositDetailsModule,
        SharedDepositDetailsModule,
    ],
    declarations: [DepositsListComponent, DepositRowHeaderComponent, DepositRowComponent],
    exports: [DepositsListComponent],
})
export class DepositsListModule {}
