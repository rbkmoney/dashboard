import { NgModule } from '@angular/core';

import { AggrProxyConfigService } from './aggr-proxy-config.service';
import { ApiModule, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: AggrProxyConfigService }],
        },
    ],
    providers: [AggrProxyConfigService],
})
export class AggrProxyModule {}
