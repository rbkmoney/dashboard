import { ClaimChangeset, ModificationUnit } from '../../../api-codegen/claim-management';
import { isDocumentModificationUnit } from '../type-guards';

export const findDocumentModificationUnit = (changeset: ClaimChangeset): ModificationUnit | null =>
    changeset.find(({ modification }) => isDocumentModificationUnit(modification));
