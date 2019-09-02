import { Injectable, SimpleChange } from '@angular/core';

import { ClaimStatusViewInfo, getClaimStatusViewInfo } from '../../../../../view-utils';
import { Claim, StatusModificationUnit } from '../../../../../api-codegen/claim-management/swagger-codegen';

export interface ClaimListItem {
    claimType: string;
    statusViewInfo: ClaimStatusViewInfo;
}

@Injectable()
export class ClaimsListItemService {
    isNeedToUpdate(claim: SimpleChange) {
        return claim.isFirstChange || claim.currentValue.id !== claim.previousValue.id;
    }

    toClaimListItem(claim: Claim): ClaimListItem {
        return {
            claimType: 'Заявка на подключение', // TODO implement this later
            statusViewInfo: getClaimStatusViewInfo(claim.status as StatusModificationUnit.StatusEnum)
        };
    }
}
