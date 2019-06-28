import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LocaleDictionaryService } from './locale/locale-dictionary';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    localeService: LocaleDictionaryService
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
