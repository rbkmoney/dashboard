import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { TranslationService } from './translation/translation.service';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    translationService: TranslationService
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
        translationService.init()
    ]);
