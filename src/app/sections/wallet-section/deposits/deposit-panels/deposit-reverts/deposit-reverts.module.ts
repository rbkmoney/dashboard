import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DepositRevertDetailsModule } from '@dsh/app/shared';
import { IndicatorsModule } from '@dsh/components/indicators';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { DepositRevertsComponent } from './deposit-reverts.component';
import { FetchDepositRevertsService } from './services/fetch-deposit-reverts.service';

@NgModule({
    declarations: [DepositRevertsComponent],
    imports: [
        FlexModule,
        CommonModule,
        ShowMorePanelModule,
        IndicatorsModule,
        MatDividerModule,
        DepositRevertDetailsModule,
        TranslocoModule,
    ],
    exports: [DepositRevertsComponent],
})
export class DepositRevertsModule {}
