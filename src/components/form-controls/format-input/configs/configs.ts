import { bankConfigs } from './bank';
import { bankCardConfigs } from './bank-card';
import { COMMON_CONFIGS } from './common';
import { contactConfigs } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { LEGAL_ENTITY_CONFIGS } from './legal-entity';

export const configs = {
    ...COMMON_CONFIGS,
    ...bankConfigs,
    ...bankCardConfigs,
    ...contactConfigs,
    ...individualEntityConfigs,
    ...LEGAL_ENTITY_CONFIGS,
};

export type Type = keyof typeof configs;
