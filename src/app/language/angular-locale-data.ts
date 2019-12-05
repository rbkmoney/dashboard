import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';

import { Language } from './language';

export const angularLocaleData: { [language in Language]: any } = {
    [Language.ru]: localeRu,
    [Language.en]: localeEn
};
