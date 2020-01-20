import { DocumentModificationUnit, ClaimChangeset } from '../../../api-codegen/claim-management';
import { isChangesetDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnits = (changeset: ClaimChangeset): DocumentModificationUnit[] =>
    changeset.filter(isChangesetDocumentModificationUnit).map(u => u.modification.claimModificationType);
