import { hasDocumentModificationUnit } from './has-document-modification-unit';
import { Claim } from '../../../api-codegen/claim-management';

export const filterByDocumentModificationUnit = (c: Claim[]): Claim[] => c.filter(hasDocumentModificationUnit);
