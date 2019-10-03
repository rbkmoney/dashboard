import { ClaimChangeset, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { isDocumentModificationUnit } from '../type-guards';
import { SpecificModificationUnit } from './specific-modification-unit';

export const filterDocumentModificationUnit = (c: ClaimChangeset) =>
    c.filter(i => isDocumentModificationUnit(i.modification)) as SpecificModificationUnit<DocumentModificationUnit>[];
