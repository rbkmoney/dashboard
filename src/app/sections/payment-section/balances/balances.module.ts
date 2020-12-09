import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { AnalyticsModule } from '@dsh/api/analytics';

import { ToMajorModule } from '../../../to-major';
import { BalancesComponent } from './balances.component';

@NgModule({
    imports: [CommonModule, AnalyticsModule, FlexLayoutModule, TranslocoModule, ToMajorModule],
    declarations: [BalancesComponent],
    exports: [BalancesComponent],
})
export class BalancesModule {}
