import { bankCardConfigs } from './bank-card';
import { contactConfigs } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { legalEntityConfigs } from './legal-entity';
import { individualOrLegalEntityInnConfig } from './individual-or-legal-entity-inn';

export const configs = {
    individualOrLegalEntityInn: individualOrLegalEntityInnConfig,
    ...bankCardConfigs,
    ...contactConfigs,
    ...individualEntityConfigs,
    ...legalEntityConfigs
};

export type Type = keyof typeof configs;
