import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ApiModelRefsModule, ToMajorModule } from '@dsh/app/shared';
import { DepositDetailsModule } from '@dsh/app/shared/components/api-model-details/deposit-details/deposit-details.module';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { DEFAULT_DEPOSITS_UPDATE_DELAY, DEPOSITS_UPDATE_DELAY_TOKEN } from '../consts';
import { DepositRowHeaderComponent } from './components/deposit-row-header/deposit-row-header.component';
import { DepositRowComponent } from './components/deposit-row/deposit-row.component';
import { DepositInfoModule } from './deposit-info';
import { DepositPanelsComponent } from './deposit-panels.component';
import { DepositRevertsModule } from './deposit-reverts/deposit-reverts.module';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        DepositDetailsModule,
        ToMajorModule,
        ApiModelRefsModule,
        DepositInfoModule,
        EmptySearchResultModule,
        ShowMorePanelModule,
        DepositRevertsModule,
    ],
    declarations: [DepositPanelsComponent, DepositRowHeaderComponent, DepositRowComponent],
    providers: [
        { provide: SEARCH_LIMIT, useValue: 3 },
        { provide: DEPOSITS_UPDATE_DELAY_TOKEN, useValue: DEFAULT_DEPOSITS_UPDATE_DELAY },
    ],
    exports: [DepositPanelsComponent],
})
export class DepositPanelsModule {}
