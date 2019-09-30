import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    Claim,
    Modification,
    ClaimModification,
    DocumentModification,
    DocumentModificationUnit,
    DocumentCreated
} from '../../../../../api-codegen/claim-management';

const isClaimModification = (m: Modification): m is ClaimModification => {
    const ClaimModificationType = Modification.ModificationTypeEnum.ClaimModification;
    return (m as ClaimModification).modificationType === ClaimModificationType;
};

const isDocumentModification = (m: ClaimModification): m is DocumentModificationUnit => {
    const DocumentModificationUnitType = ClaimModification.ClaimModificationTypeEnum.DocumentModificationUnit;
    return (m as DocumentModificationUnit).claimModificationType === DocumentModificationUnitType;
};

const isDocumentCreated = (m: DocumentModification): m is DocumentCreated => {
    const DocumentCreatedType = DocumentModification.DocumentModificationTypeEnum.DocumentCreated;
    return (m as DocumentCreated).documentModificationType === DocumentCreatedType;
};

const filterQuestionary = ({ changeset }: Claim): boolean => {
    const found = changeset.find(({ modification }) => {
        if (!isClaimModification(modification)) {
            return false;
        }
        if (!isDocumentModification(modification)) {
            return false;
        }
        if (!isDocumentCreated(modification.modification)) {
            return false;
        }
        return true;
    });
    return !!found;
};

const mapQuestionary = (c: Claim[]): Claim[] => c.filter(filterQuestionary);

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> => s.pipe(map(mapQuestionary));
