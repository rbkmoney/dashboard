import { Injectable } from '@angular/core';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class ClaimManagementConfigService extends Configuration {
    constructor({ api }: ConfigService) {
        super({ apiKeys: {}, basePath: api.claimManagementEndpoint });
    }
}
