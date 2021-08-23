import { Overwrite } from 'utility-types';

import { ClaimModification, ClaimModificationType, Modification } from '@dsh/api-codegen/claim-management';

export type SpecificClaimModificationUnit<M extends ClaimModificationType = ClaimModificationType> = Overwrite<
    ClaimModification,
    { modificationType: typeof Modification.ModificationTypeEnum.ClaimModification; claimModificationType: M }
>;
