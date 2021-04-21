import { AMOUNT_CONFIG } from './amount';
import { INDIVIDUAL_OR_LEGAL_ENTITY_INN_CONFIG } from './individual-or-legal-entity-inn';
import { QUANTITY_CONFIG } from './quantity';

export * from './individual-or-legal-entity-inn';
export * from './amount';
export * from './quantity';

export const COMMON_CONFIGS = {
    individualOrLegalEntityInn: INDIVIDUAL_OR_LEGAL_ENTITY_INN_CONFIG,
    amount: AMOUNT_CONFIG,
    quantity: QUANTITY_CONFIG,
};
