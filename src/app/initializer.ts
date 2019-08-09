import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LocaleDictionaryService } from './locale/locale-dictionary';
import { Language } from './locale';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    localeService: LocaleDictionaryService
) => async () => {
    await Promise.all([
        configService.init({ configUrl: '/assets/appConfig.json' }),
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
        localeService.init({ [Language.ru]: '/assets/locales/ru.json' })
    ]);
};
