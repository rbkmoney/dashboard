import get from 'lodash.get';

import { ModificationUnit, Modification } from '../../../../api/claim-management';

export type SpecificModificationUnit<M> = ModificationUnit & { modification: M };

export const getIsSpecificModificationUnit = <T extends Modification>() => <M extends T & { modification: any }>(
    unit: ModificationUnit & { modification: T },
    modificationType: keyof M['modification']
): unit is SpecificModificationUnit<M> => {
    return !!get(unit.modification, ['modification', modificationType]);
};
