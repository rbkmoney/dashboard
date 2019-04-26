import { Injectable } from '@angular/core';

import { ConfigService } from '../../config/config.service';
import { Configuration } from './swagger-codegen';

@Injectable()
export class CAPIConfigService extends Configuration {
    constructor(config: ConfigService) {
        super({
            apiKeys: { Authorization: '' },
            basePath: config.api.capiEndpoint
        });
    }
}
