import { individualEntityInnConfig } from './individual-entity-inn';
import { issuerCodeConfig } from './issuer-code-mask';
import { seriesNumberConfig } from './series-number';
import { snilsConfig } from './snils';

export * from './individual-entity-inn';
export * from './issuer-code-mask';
export * from './series-number';
export * from './snils';

export const individualEntityConfigs = {
    individualEntityInn: individualEntityInnConfig,
    issuerCode: issuerCodeConfig,
    seriesNumber: seriesNumberConfig,
    snils: snilsConfig,
};
