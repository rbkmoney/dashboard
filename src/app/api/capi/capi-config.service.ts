import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { Configuration } from './swagger-codegen';

@Injectable()
export class CAPIConfigService extends Configuration {
    constructor(config: ConfigService) {
        super({
            apiKeys: { Authorization: 'Bearer KEY' },
            basePath: config.api.capiEndpoint
        });
    }
}
