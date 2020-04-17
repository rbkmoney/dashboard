import { amountConfig } from './amount';
import { individualOrLegalEntityInnConfig } from './individual-or-legal-entity-inn';
import { quantityConfig } from './quantity';

export * from './individual-or-legal-entity-inn';
export * from './amount';
export * from './quantity';

export const commonConfigs = {
    individualOrLegalEntityInn: individualOrLegalEntityInnConfig,
    amount: amountConfig,
    quantity: quantityConfig
};
