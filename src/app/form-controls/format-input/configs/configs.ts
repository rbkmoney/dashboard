import { bankCardConfigs } from './bank-card';
import { contactConfigs } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { legalEntityConfigs } from './legal-entity';
import { commonConfigs } from './common';
import { bankConfigs } from './bank';

export const configs = {
    ...commonConfigs,
    ...bankConfigs,
    ...bankCardConfigs,
    ...contactConfigs,
    ...individualEntityConfigs,
    ...legalEntityConfigs
};

export type Type = keyof typeof configs;
