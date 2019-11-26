import { individualEntityInnConfig } from './individual-entity-inn';
import { snilsConfig } from './snils';
import { seriesNumberConfig } from './series-number';
import { issuerCodeConfig } from './issuer-code-mask';

export * from './individual-entity-inn';
export * from './issuer-code-mask';
export * from './series-number';
export * from './snils';

export const individualEntityConfigs = {
    individualEntityInn: individualEntityInnConfig,
    issuerCode: issuerCodeConfig,
    seriesNumber: seriesNumberConfig,
    snils: snilsConfig
};
