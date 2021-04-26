import { ClaimModification, Modification, PartyModification } from '@dsh/api-codegen/claim-management';

import { createUnionTypeGuardCreator } from '../../utils';

const TYPE = Modification.ModificationTypeEnum;
const createTypeGuard = createUnionTypeGuardCreator<Modification>('modificationType');

export const isClaimModification = createTypeGuard<ClaimModification>(TYPE.ClaimModification);
export const isPartyModification = createTypeGuard<PartyModification>(TYPE.PartyModification);
