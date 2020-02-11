import { NgModule } from '@angular/core';

import { ApiModule, Configuration, ClaimsService } from './swagger-codegen';
import { CAPIConfigService } from './capi-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CAPIConfigService }]
        }
    ],
    providers: [CAPIConfigService, ClaimsService]
})
export class CAPIModule {}
