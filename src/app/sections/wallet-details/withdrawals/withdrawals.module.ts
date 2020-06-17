import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule, DetailsItemModule, HeadlineModule } from '@dsh/components/layout';
import { WithdrawalInfoModule } from '@dsh/components/layout/withdrawal-info';

import { WithdrawalsModule as WithdrawalsApiModule } from '../../../api/withdrawals';
import { ToMajorModule } from '../../../to-major';
import { WithdrawalsComponent } from './withdrawals.component';

@NgModule({
    imports: [
        CardModule,
        ToMajorModule,
        DetailsItemModule,
        FlexModule,
        CommonModule,
        TranslocoModule,
        WithdrawalsApiModule,
        HeadlineModule,
        WithdrawalInfoModule,
        MatDividerModule,
        SpinnerModule,
        ButtonModule,
    ],
    declarations: [WithdrawalsComponent],
    exports: [WithdrawalsComponent],
})
export class WithdrawalsModule {}