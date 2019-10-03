import { Claim } from '../../../api-codegen/claim-management';
import { findDocumentModificationUnit } from './find-document-modification-unit';

export const hasDocumentModificationUnit = ({ changeset }: Claim): boolean => !!findDocumentModificationUnit(changeset);
