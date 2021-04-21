import { bankConfigs } from './bank';
import { bankCardConfigs } from './bank-card';
import { COMMON_CONFIGS } from './common';
import { CONTACT_CONFIGS } from './contact';
import { individualEntityConfigs } from './individual-entity';
import { LEGAL_ENTITY_CONFIGS } from './legal-entity';

export const configs = {
    ...COMMON_CONFIGS,
    ...bankConfigs,
    ...bankCardConfigs,
    ...CONTACT_CONFIGS,
    ...individualEntityConfigs,
    ...LEGAL_ENTITY_CONFIGS,
};

export type Type = keyof typeof configs;
