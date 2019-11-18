import { ClaimModificationType, ClaimModification, Modification } from '../../../api-codegen/claim-management';
import { Replace } from '../../../../type-utils';

export type SpecificClaimModification<M extends ClaimModificationType = ClaimModificationType> = Replace<
    ClaimModification,
    { modificationType: typeof Modification.ModificationTypeEnum.ClaimModification; claimModificationType: M }
>;
