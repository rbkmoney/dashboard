import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class DarkApiConfigService extends Configuration {
    constructor(keycloakService: KeycloakService, { apiEndpoint }: ConfigService) {
        super({
            apiKeys: { Authorization: `Bearer ${keycloakService.getKeycloakInstance().token}` },
            basePath: `${apiEndpoint}/dark-api/v1`
        });
    }
}
