import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule, DetailsItemModule, HeadlineModule } from '@dsh/components/layout';
import { DepositInfoModule } from '@dsh/components/layout/deposit-info';

import { DepositsModule as DepositsApiModule } from '../../../api/deposits';
import { ToMajorModule } from '../../../to-major';
import { DepositsComponent } from './deposits.component';

@NgModule({
    imports: [
        CardModule,
        ToMajorModule,
        DetailsItemModule,
        FlexModule,
        CommonModule,
        TranslocoModule,
        DepositsApiModule,
        HeadlineModule,
        MatDividerModule,
        DepositInfoModule,
        ButtonModule,
        SpinnerModule,
    ],
    declarations: [DepositsComponent],
    exports: [DepositsComponent],
})
export class DepositsModule {}
