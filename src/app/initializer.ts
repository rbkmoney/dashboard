import { KeycloakService } from './auth/keycloak-stub';

import { ConfigService } from './config/config.service';

export const initializer = (configService: ConfigService, keycloakService: KeycloakService) => () =>
    Promise.all([
        configService.init(),
        keycloakService.init({
            config: '/assets/authConfig.json',
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: true
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets'],
            bearerPrefix: 'Bearer'
        })
    ]);
