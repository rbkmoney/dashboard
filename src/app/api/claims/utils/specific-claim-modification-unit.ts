import { Replace } from '../../../../type-utils';
import { ClaimModification, ClaimModificationType, Modification } from '../../../api-codegen/claim-management';

export type SpecificClaimModificationUnit<M extends ClaimModificationType = ClaimModificationType> = Replace<
    ClaimModification,
    { modificationType: typeof Modification.ModificationTypeEnum.ClaimModification; claimModificationType: M }
>;
