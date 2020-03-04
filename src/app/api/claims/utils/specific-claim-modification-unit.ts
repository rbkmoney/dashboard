import { Overwrite } from 'utility-types';

import { ClaimModificationType, ClaimModification, Modification } from '../../../api-codegen/claim-management';

export type SpecificClaimModificationUnit<M extends ClaimModificationType = ClaimModificationType> = Overwrite<
    ClaimModification,
    { modificationType: typeof Modification.ModificationTypeEnum.ClaimModification; claimModificationType: M }
>;
