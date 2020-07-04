import { ClaimModification, Modification, PartyModification } from '../../../api-codegen/claim-management';
import { createUnionTypeGuardCreator } from '../../utils';

const Type = Modification.ModificationTypeEnum;
const createTypeGuard = createUnionTypeGuardCreator<Modification>('modificationType');

export const isClaimModification = createTypeGuard<ClaimModification>(Type.ClaimModification);
export const isPartyModification = createTypeGuard<PartyModification>(Type.PartyModification);
