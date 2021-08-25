import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { WithdrawalsModule as WithdrawalsApiModule } from '@dsh/api';
import { SpinnerModule } from '@dsh/components/indicators';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WithdrawalsFiltersModule } from './withdrawals-filters';
import { WithdrawalsListModule } from './withdrawals-list';
import { WithdrawalsRoutingModule } from './withdrawals-routing.module';
import { WithdrawalsComponent } from './withdrawals.component';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';

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
        EmptySearchResultModule,
    ],
    declarations: [WithdrawalsComponent],
})
export class WithdrawalsModule {}
