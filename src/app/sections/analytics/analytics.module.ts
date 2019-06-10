import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { AnalyticsComponent } from './analytics.component';
import { ChartsModule } from '../../charts';
import { AnalyticsService } from './analytics.service';
import { LayoutModule } from '../../layout';

@NgModule({
    imports: [ChartsModule, LayoutModule, FlexModule],
    declarations: [AnalyticsComponent],
    providers: [AnalyticsService]
})
export class AnalyticsModule {}
