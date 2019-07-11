import { Injectable } from '@angular/core';

import { ConfigService } from '../../config/config.service';
import { Configuration } from './swagger-codegen';

// keycloak-angular will automatically set up before requesting
const STUB_AUTHORIZATION = 'Bearer STUB';

@Injectable()
export class ClaimManagementConfigService extends Configuration {
    constructor(config: ConfigService) {
        super({
            apiKeys: { Authorization: STUB_AUTHORIZATION },
            basePath: config.api.claimManagementEndpoint
        });
    }
}
