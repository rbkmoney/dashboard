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
        }),
        localeService.init({ [Language.ru]: '/assets/locales/ru.json' })
    ]);
};
