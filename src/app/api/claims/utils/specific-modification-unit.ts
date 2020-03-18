import { Replace } from '../../../../type-utils';
import { Modification, ModificationUnit } from '../../../api-codegen/claim-management';

export type SpecificModificationUnit<M extends Modification = Modification> = Replace<
    ModificationUnit,
    { modification: M }
>;
