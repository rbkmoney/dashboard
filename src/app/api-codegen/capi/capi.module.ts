import { NgModule } from '@angular/core';

import { CAPIConfigService } from './capi-config.service';
import { ApiModule, ClaimsService, Configuration, WebhooksService } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CAPIConfigService }]
        }
    ],
    providers: [CAPIConfigService, ClaimsService, WebhooksService]
})
export class CAPIModule {}
