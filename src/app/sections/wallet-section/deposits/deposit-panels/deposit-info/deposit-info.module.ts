import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositDetailsModule } from './deposit-details';
import { DepositInfoComponent } from './deposit-info.component';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        IndicatorsModule,
        ToMajorModule,
        DepositDetailsModule,
    ],
    declarations: [DepositInfoComponent],
    exports: [DepositInfoComponent],
})
export class DepositInfoModule {}
