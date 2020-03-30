import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '@dsh/components/charts/bar-chart';
import { DonutChartModule } from '@dsh/components/charts/donut-chart';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { DistributionItemComponent } from './distribution-item';
import { DistributionsComponent } from './distributions.component';

@NgModule({
    imports: [CommonModule, CardModule, BarChartModule, FlexModule, SpinnerModule, TranslocoModule, DonutChartModule],
    exports: [DistributionsComponent],
    declarations: [DistributionsComponent, DistributionItemComponent]
})
export class DistributionsModule {}
