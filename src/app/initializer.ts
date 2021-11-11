import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { IconsService } from './icons';
import { initSentry } from './init-sentry';
import { LanguageService } from './language';
import { ThemeManager } from './theme-manager';
import { YandexMetrikaConfigService } from './yandex-metrika';

export const initializer =
    (
        configService: ConfigService,
        keycloakService: KeycloakService,
        languageService: LanguageService,
        yandexMetrikaService: YandexMetrikaConfigService,
        platformId: any,
        themeManager: ThemeManager,
        iconsService: IconsService
    ) =>
    () =>
        Promise.all([
            configService.init({ configUrl: '/appConfig.json' }).then(() =>
                Promise.all([
                    yandexMetrikaService.init(configService.yandexMetrika, platformId),
                    themeManager.init(),
                    initSentry(configService.sentryDsn),
                    keycloakService.init({
                        config: '/authConfig.json',
                        initOptions: {
                            onLoad: 'login-required',
                            checkLoginIframe: true,
                        },
                        loadUserProfileAtStartUp: true,
                        enableBearerInterceptor: true,
                        bearerExcludedUrls: ['/assets', configService.fileStorageEndpoint],
                        bearerPrefix: 'Bearer',
                    }),
                ])
            ),
            languageService.init(),
            iconsService.init(),
        ]);
