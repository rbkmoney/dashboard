import { ClaimChangeset, ModificationUnit } from '../../../api-codegen/claim-management';
import { isDocumentModificationUnit } from '../type-guards';

export const filterDocumentModificationUnit = (changeset: ClaimChangeset): ModificationUnit[] =>
    changeset.filter(({ modification }) => isDocumentModificationUnit(modification));
