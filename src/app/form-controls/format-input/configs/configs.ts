import { bankCardConfigs } from './bank-card';
import { contactConfigs } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { legalEntityConfigs } from './legal-entity';

export const configs = {
    ...bankCardConfigs,
    ...contactConfigs,
    ...individualEntityConfigs,
    ...legalEntityConfigs
};

export type Type = keyof typeof configs;
