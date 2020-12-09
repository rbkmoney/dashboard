import { Modification, ModificationUnit } from '@dsh/api-codegen/claim-management';

import { Replace } from '../../../../type-utils';

export type SpecificModificationUnit<M extends Modification = Modification> = Replace<
    ModificationUnit,
    { modification: M }
>;
