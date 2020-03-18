import { bankConfigs } from './bank';
import { bankCardConfigs } from './bank-card';
import { commonConfigs } from './common';
import { contactConfigs } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { legalEntityConfigs } from './legal-entity';

export const configs = {
    ...commonConfigs,
    ...bankConfigs,
    ...bankCardConfigs,
    ...contactConfigs,
    ...individualEntityConfigs,
    ...legalEntityConfigs
};

export type Type = keyof typeof configs;
