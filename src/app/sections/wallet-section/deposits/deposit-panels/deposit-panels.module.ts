import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ApiModelTypesModule, ToMajorModule } from '@dsh/app/shared';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { DepositRowHeaderComponent } from './components/deposit-row-header/deposit-row-header.component';
import { DepositRowComponent } from './components/deposit-row/deposit-row.component';
import { DepositInfoModule } from './deposit-info';
import { DepositPanelsComponent } from './deposit-panels.component';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        ToMajorModule,
        ApiModelRefsModule,
        DepositInfoModule,
        EmptySearchResultModule,
        ShowMorePanelModule,
        IndicatorsModule,
        ApiModelTypesModule,
    ],
    declarations: [DepositPanelsComponent, DepositRowHeaderComponent, DepositRowComponent],
    exports: [DepositPanelsComponent],
})
export class DepositPanelsModule {}