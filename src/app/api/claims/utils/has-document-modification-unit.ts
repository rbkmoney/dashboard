import { Claim } from '../../../api-codegen/claim-management';
import { filterDocumentModificationUnit } from './filter-document-modification-unit';

export const hasDocumentModificationUnit = ({ changeset }: Claim): boolean =>
    filterDocumentModificationUnit(changeset).length > 0;
