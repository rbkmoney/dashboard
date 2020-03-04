import { Modification, ModificationUnit } from '../../../api-codegen/claim-management';
import { Replace } from '../../../../type-utils';

export type SpecificModificationUnit<M extends Modification = Modification> = Replace<
    ModificationUnit,
    { modification: M }
>;
