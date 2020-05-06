import { NgModule } from '@angular/core';

import { CAPIConfigService } from './capi-config.service';
import { ShopsService } from './shops.service';
import { ApiModule, ClaimsService, Configuration } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CAPIConfigService }]
        }
    ],
    providers: [CAPIConfigService, ClaimsService, ShopsService]
})
export class CAPIModule {}
