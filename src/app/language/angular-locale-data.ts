import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';

import { Language } from './language';

export const ANGULAR_LOCALE_DATA: { [language in Language]: any } = {
    [Language.Ru]: localeRu,
    [Language.En]: localeEn,
};
