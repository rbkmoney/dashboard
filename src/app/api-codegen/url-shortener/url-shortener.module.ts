import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { UrlShortenerConfigService } from './url-shortener-config.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: UrlShortenerConfigService }]
        }
    ],
    providers: [UrlShortenerConfigService]
})
export class UrlShortenerModule {}
