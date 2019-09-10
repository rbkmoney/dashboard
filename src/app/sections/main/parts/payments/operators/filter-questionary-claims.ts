import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    Claim,
    Modification,
    ClaimModification,
    DocumentModification,
    DocumentModificationUnit
} from '../../../../../api-codegen/claim-management';

const filterQuestionary = ({ changeset }: Claim): boolean => {
    const found = changeset.find(({ modification }) => {
        const ClaimModificationType = Modification.ModificationTypeEnum.ClaimModification;
        if (modification.modificationType !== ClaimModificationType) {
            return false;
        }
        const DocumentModificationUnitType = ClaimModification.ClaimModificationTypeEnum.DocumentModificationUnit;
        const claimMod = modification as ClaimModification;
        if (claimMod.claimModificationType !== DocumentModificationUnitType) {
            return false;
        }
        const DocumentCreatedType = DocumentModification.DocumentModificationTypeEnum.DocumentCreated;
        const documentMod = claimMod as DocumentModificationUnit;
        if (documentMod.modification.documentModificationType !== DocumentCreatedType) {
            return false;
        }
        return true;
    });
    return !!found;
};

const mapQuestionary = (c: Claim[]): Claim[] => c.filter(filterQuestionary);

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> => s.pipe(map(mapQuestionary));
