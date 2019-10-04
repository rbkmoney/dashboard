import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class AapiConfigService extends Configuration {
    constructor({ api }: ConfigService) {
        const apiVersion = 'v1';
        super({ apiKeys: {}, basePath: `${api.aapiEndpoint}/${apiVersion}` });
    }
}
