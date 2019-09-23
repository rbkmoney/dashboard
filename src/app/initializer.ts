import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';

export const initializer = (configService: ConfigService, keycloakService: KeycloakService) => async () => {
    await Promise.all([
        configService.init({ configUrl: '/appConfig.json' }),
        keycloakService.init({
            config: '/authConfig.json',
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: true
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets'],
            bearerPrefix: 'Bearer'
        })
    ]);
};
