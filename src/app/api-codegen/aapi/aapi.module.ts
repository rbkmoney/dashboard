import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { AapiConfigService } from './aapi-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: AapiConfigService }]
        }
    ],
    providers: [AapiConfigService]
})
export class AapiModule {}
