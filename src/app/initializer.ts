import { YandexCounterConfig } from 'ng-yandex-metrika/lib/ng-yandex-metrika.config';

import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LanguageService } from './language';
import { YandexMetrikaConfigService } from './yandex-metrika';

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    languageService: LanguageService,
    yandexMetrikaService: YandexMetrikaConfigService,
    platformId: object
) => () =>
    Promise.all([
        configService.init({ configUrl: '/appConfig.json' }).then(() => {
            const { id, ...settings } = configService.yandexMetrika as YandexCounterConfig;
            return yandexMetrikaService.init(
                {
                    id,
                    ...settings
                },
                platformId
            )
        }),
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
