import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { AnalyticsModule } from '../../../../api/analytics';
import { CardModule } from '../../../../layout/card';
import { SpinnerModule } from '../../../../spinner';
import { PercentDifferenceModule } from '../percent-difference';
import { StatItemComponent } from './stat-item';
import { StatsComponent } from './stats.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        MatSelectModule,
        SpinnerModule,
        AnalyticsModule,
        CardModule,
        PercentDifferenceModule
    ],
    exports: [StatsComponent],
    declarations: [StatsComponent, StatItemComponent]
})
export class StatsModule {}
