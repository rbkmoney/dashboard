import { Overwrite } from 'utility-types';

import { Modification, ModificationUnit } from '../../../api-codegen/claim-management';

export type SpecificModificationUnit<M extends Modification = Modification> = Overwrite<
    ModificationUnit,
    { modification: M }
>;
