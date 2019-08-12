import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { CAPIConfigService } from './capi-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CAPIConfigService }]
        }
    ],
    providers: [CAPIConfigService]
})
export class CAPIModule {}
