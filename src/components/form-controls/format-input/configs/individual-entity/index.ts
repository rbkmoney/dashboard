import { INDIVIDUAL_ENTITY_INN_CONFIG } from './individual-entity-inn';
import { ISSUER_CODE_CONFIG } from './issuer-code-mask';
import { OGRN_CONFIG } from './ogrn';
import { SERIES_NUMBER_CONFIG } from './series-number';
import { SNILS_CONFIG } from './snils';

export * from './individual-entity-inn';
export * from './issuer-code-mask';
export * from './series-number';
export * from './snils';
export * from './ogrn';

export const INDIVIDUAL_ENTITY_CONFIGS = {
    individualEntityInn: INDIVIDUAL_ENTITY_INN_CONFIG,
    issuerCode: ISSUER_CODE_CONFIG,
    seriesNumber: SERIES_NUMBER_CONFIG,
    snils: SNILS_CONFIG,
    ogrn: OGRN_CONFIG,
};
