import { ModificationUnit } from '../../../../api/claim-management';

export type SpecificModificationUnit<M> = ModificationUnit & { modification: M };
