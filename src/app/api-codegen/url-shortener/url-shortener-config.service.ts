import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class UrlShortenerConfigService extends Configuration {
    constructor({ urlShortenerEndpoint }: ConfigService) {
        super({ apiKeys: {}, basePath: `${urlShortenerEndpoint}/v1/shortened-urls` });
    }
}
