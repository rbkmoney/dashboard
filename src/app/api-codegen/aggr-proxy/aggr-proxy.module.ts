import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { AggrProxyConfigService } from './aggr-proxy-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: AggrProxyConfigService }]
        }
    ],
    providers: [AggrProxyConfigService]
})
export class AggrProxyModule {}
