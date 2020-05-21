import { NgModule } from '@angular/core';

import { AnalyticsService } from './analytics.service';
import { AnapiConfigService } from './anapi-config.service';
import { ReportsService } from './reports.service';
import { ApiModule, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: AnapiConfigService }],
        },
    ],
    providers: [AnapiConfigService, ReportsService, AnalyticsService],
})
export class AnapiModule {}
