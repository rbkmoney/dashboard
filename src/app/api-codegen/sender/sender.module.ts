import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './openapi-codegen';
import { SenderConfigService } from './sender-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: SenderConfigService }]
        }
    ],
    providers: [SenderConfigService]
})
export class SenderModule {
}
