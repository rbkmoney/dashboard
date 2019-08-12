import localeRu from '@angular/common/locales/ru';

import { Language } from './language';

export const angularLocaleData: { [language in Language]: any } = {
    [Language.ru]: localeRu
};
