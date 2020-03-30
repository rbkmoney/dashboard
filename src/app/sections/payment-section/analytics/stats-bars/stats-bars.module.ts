import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '../../../../charts/bar-chart';
import { CardModule } from '../../../../layout/card';
import { SpinnerModule } from '../../../../spinner';
import { StatsBarItemComponent } from './stats-bars-item';
import { StatsBarsComponent } from './stats-bars.component';

@NgModule({
    imports: [CommonModule, CardModule, BarChartModule, FlexModule, SpinnerModule, TranslocoModule],
    exports: [StatsBarsComponent],
    declarations: [StatsBarsComponent, StatsBarItemComponent]
})
export class StatsBarsModule {}
