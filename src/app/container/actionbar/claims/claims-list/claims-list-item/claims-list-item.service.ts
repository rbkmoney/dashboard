import { Injectable, SimpleChange } from '@angular/core';

import { ClaimStatusViewInfo, getClaimStatusViewInfo } from '../../../../../from-minor';
import { Claim, StatusModificationUnit } from '../../../../../api-codegen/claim-management/swagger-codegen';
import { getClaimType, ClaimType } from './get-claim-type';

export interface ClaimListItem {
    claimType: ClaimType;
    statusViewInfo: ClaimStatusViewInfo;
}

@Injectable()
export class ClaimsListItemService {
    isNeedToUpdate(claim: SimpleChange) {
        return claim.isFirstChange || claim.currentValue.id !== claim.previousValue.id;
    }

    toClaimListItem(claim: Claim): ClaimListItem {
        return {
            claimType: getClaimType(claim.changeset),
            statusViewInfo: getClaimStatusViewInfo(claim.status as StatusModificationUnit.StatusEnum)
        };
    }
}
