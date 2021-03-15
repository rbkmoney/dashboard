import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared';
import { DepositDetailsModule as SharedDepositDetailsModule } from '@dsh/app/shared/components/api-model-details/deposit-details/deposit-details.module';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositMainInfoComponent } from './components/deposit-main-info/deposit-main-info.component';
import { DepositDetailsComponent } from './deposit-details.component';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        IndicatorsModule,
        ToMajorModule,
        SharedDepositDetailsModule,
    ],
    declarations: [DepositDetailsComponent, DepositMainInfoComponent],
    exports: [DepositDetailsComponent],
})
export class DepositDetailsModule {}
