import { Modification, ModificationUnit } from '../../../../api-codegen/claim-management';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type SpecificUnion<T, K> = Omit<T, keyof K> & K;

export type SpecificModificationUnit<M extends Modification = Modification> = SpecificUnion<
    ModificationUnit,
    { modification: M }
>;
