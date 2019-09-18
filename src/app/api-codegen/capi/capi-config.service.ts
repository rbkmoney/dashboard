import { Injectable } from '@angular/core';

import { ConfigService } from '../../config/config.service';
import { Configuration } from './swagger-codegen';

@Injectable()
export class CAPIConfigService extends Configuration {
    constructor({ api }: ConfigService) {
        const apiVersion = 'v3';
        super({ apiKeys: {}, basePath: `${api.capiEndpoint}/${apiVersion}` });
    }
}
