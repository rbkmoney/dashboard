import { currencyConfig } from './currency';
import { individualOrLegalEntityInnConfig } from './individual-or-legal-entity-inn';
import { quantityConfig } from './quantity';

export * from './individual-or-legal-entity-inn';
export * from './currency';
export * from './quantity';

export const commonConfigs = {
    individualOrLegalEntityInn: individualOrLegalEntityInnConfig,
    currency: currencyConfig,
    quantity: quantityConfig
};
