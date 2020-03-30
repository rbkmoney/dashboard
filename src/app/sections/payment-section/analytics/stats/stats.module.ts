import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { AnalyticsModule } from '../../../../api/analytics';
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
