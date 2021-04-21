import { bankConfigs } from './bank';
import { bankCardConfigs } from './bank-card';
import { COMMON_CONFIGS } from './common';
import { contactConfigs } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { legalEntityConfigs } from './legal-entity';

export const configs = {
    ...COMMON_CONFIGS,
    ...bankConfigs,
    ...bankCardConfigs,
    ...contactConfigs,
    ...individualEntityConfigs,
    ...legalEntityConfigs,
};

export type Type = keyof typeof configs;
