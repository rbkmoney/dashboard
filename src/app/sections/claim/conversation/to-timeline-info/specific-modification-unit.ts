import { ModificationUnit } from '../../../../api-codegen/claim-management';

export type SpecificModificationUnit<M> = ModificationUnit & { modification: M };
