import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { WithdrawalsModule as WithdrawalsApiModule } from '@dsh/api';
import { SpinnerModule } from '@dsh/components/indicators';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { FetchWithdrawalsService } from './services/fetch-withdrawals/fetch-withdrawals.service';
import { WithdrawalsFiltersModule } from './withdrawals-filters';
import { WithdrawalsListModule } from './withdrawals-list';
import { WithdrawalsRoutingModule } from './withdrawals-routing.module';
import { WithdrawalsComponent } from './withdrawals.component';

@NgModule({
    imports: [
        WithdrawalsRoutingModule,
        CommonModule,
        ScrollUpModule,
        TranslocoModule,
        FlexModule,
        WithdrawalsListModule,
        ShowMorePanelModule,
        SpinnerModule,
        WithdrawalsApiModule,
        WithdrawalsFiltersModule,
    ],
    declarations: [WithdrawalsComponent],
    providers: [FetchWithdrawalsService],
})
export class WithdrawalsModule {}
