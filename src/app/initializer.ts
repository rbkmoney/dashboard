import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LanguageService } from './language';
import { ThemeManager } from './theme-manager';
import { YandexMetrikaConfigService } from './yandex-metrika';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    languageService: LanguageService,
    yandexMetrikaService: YandexMetrikaConfigService,
    platformId: object,
    themeManager: ThemeManager
) => () =>
    Promise.all([
        configService
            .init({ configUrl: '/appConfig.json' })
            .then(() =>
                Promise.all([yandexMetrikaService.init(configService.yandexMetrika, platformId), themeManager.init()])
            ),
        keycloakService.init({
            config: '/authConfig.json',
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: true,
            },
            loadUserProfileAtStartUp: true,
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets', 'https://storage.rbk.money/files'],
            bearerPrefix: 'Bearer',
        }),
        languageService.init(),
    ]);
