import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LanguageService } from './language';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    languageService: LanguageService
) => async () => {
    await Promise.all([
        configService.init({ configUrl: '/appConfig.json' }),
        keycloakService.init({
            config: '/authConfig.json',
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: true
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets', 'https://storage.rbk.money/files'],
            bearerPrefix: 'Bearer'
        }),
        languageService.init()
    ]);
};
