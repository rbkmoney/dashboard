import { NgModule } from '@angular/core';

import { AnapiConfigService } from './anapi-config.service';
import { ReportsService } from './reports.service';
import { ApiModule, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: AnapiConfigService }]
        }
    ],
    providers: [AnapiConfigService, ReportsService]
})
export class AnapiModule {}
