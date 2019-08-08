import localeRu from '@angular/common/locales/ru';

import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { LocaleDictionaryService } from './locale/locale-dictionary';
import { ThemeManager } from './theme-manager';
import { LanguageService } from './languge';

const supportedLanguages = ['ru'] as const;
const supportedThemes = ['light', 'dark'] as const;

export const initializer = (
    configService: ConfigService,
    keycloakService: KeycloakService,
    localeService: LocaleDictionaryService,
    themeManager: ThemeManager,
    languageService: LanguageService
) => async () => {
    themeManager.init(supportedThemes, supportedThemes[0]);
    languageService.init(supportedLanguages, supportedLanguages[0], { ru: localeRu });
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
        localeService.init<typeof supportedLanguages[number]>({ ru: '/assets/locales/ru.json' })
    ]);
};
