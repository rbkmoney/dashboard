import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '@dsh/components/charts';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { BarChartItemComponent } from './bar-chart-item.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, CardModule, SpinnerModule, TranslocoModule, BarChartModule],
    declarations: [BarChartItemComponent],
    exports: [BarChartItemComponent],
})
export class BarChartItemModule {}
