import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LocaleDictionaryService } from './locale/locale-dictionary';
import { SettingsService } from './settings';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    localeService: LocaleDictionaryService,
    settingsService: SettingsService
) => () =>
    Promise.all([
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
        localeService.init({ localesUrl: '/assets/locales' }),
        settingsService.init()
    ]);
