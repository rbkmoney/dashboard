import { INDIVIDUAL_ENTITY_INN_CONFIG } from './individual-entity-inn';
import { ISSUER_CODE_CONFIG } from './issuer-code-mask';
import { SERIES_NUMBER_CONFIG } from './series-number';
import { SNILS_CONFIG } from './snils';

export * from './individual-entity-inn';
export * from './issuer-code-mask';
export * from './series-number';
export * from './snils';

export const individualEntityConfigs = {
    individualEntityInn: INDIVIDUAL_ENTITY_INN_CONFIG,
    issuerCode: ISSUER_CODE_CONFIG,
    seriesNumber: SERIES_NUMBER_CONFIG,
    snils: SNILS_CONFIG,
};
