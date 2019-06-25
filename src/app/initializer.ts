import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LocaleService } from './locale';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    localeService: LocaleService
) => () =>
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
        }),
        localeService.init()
    ]);
