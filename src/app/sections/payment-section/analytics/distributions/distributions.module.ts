import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '../../../../charts/bar-chart';
import { DonutChartModule } from '../../../../charts/donut-chart';
import { CardModule } from '../../../../layout/card';
import { SpinnerModule } from '../../../../spinner';
import { DistributionItemComponent } from './distribution-item';
import { DistributionsComponent } from './distributions.component';

@NgModule({
    imports: [CommonModule, CardModule, BarChartModule, FlexModule, SpinnerModule, TranslocoModule, DonutChartModule],
    exports: [DistributionsComponent],
    declarations: [DistributionsComponent, DistributionItemComponent]
})
export class DistributionsModule {}
