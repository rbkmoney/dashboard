import { ClaimChangeset, FileModification, FileModificationUnit } from '@dsh/api-codegen/claim-management';

import { isClaimModification, isFileModificationUnit } from '../type-guards';
import { sortUnitsByCreatedAtAsc } from './sort-units';

export const takeFileModificationUnits = (changeset: ClaimChangeset): FileModificationUnit[] =>
    changeset.sort(sortUnitsByCreatedAtAsc).reduce((acc, { modification }) => {
        if (isClaimModification(modification) && isFileModificationUnit(modification.claimModificationType)) {
            const m = modification.claimModificationType;
            if (m.fileModification.fileModificationType === FileModification.FileModificationTypeEnum.FileCreated) {
                return acc.concat(m);
            } else if (
                m.fileModification.fileModificationType === FileModification.FileModificationTypeEnum.FileDeleted
            ) {
                return acc.filter(({ fileId }) => fileId !== m.fileId);
            }
        }
        return acc;
    }, [] as FileModificationUnit[]);
