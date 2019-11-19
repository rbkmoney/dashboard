import { Injectable, NgZone } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { ConfigService } from '../../config';
import { Configuration } from './swagger-codegen';

@Injectable()
export class DarkApiConfigService extends Configuration {
    constructor(private keycloakService: KeycloakService, private ngZone: NgZone, { api }: ConfigService) {
        super({
            apiKeys: { Authorization: `Bearer ${keycloakService.getKeycloakInstance().token}` },
            basePath: api.dapiEndpoint
        });
    }
}
