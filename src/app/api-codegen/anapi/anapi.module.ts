import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { AnapiConfigService } from './anapi-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: AnapiConfigService }]
        }
    ],
    providers: [AnapiConfigService]
})
export class AnapiModule {}
