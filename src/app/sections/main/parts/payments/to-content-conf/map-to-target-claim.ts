import { combineLatest, Observable } from 'rxjs';

import { ClaimStatus } from '../../../../../api';
import { Claim } from '../../../../../api-codegen/claim-management';
import { filterByProp } from '../../../../../custom-operators';
import { filterQuestionaryClaims, takeClaimByPriority } from '../operators';

export const mapToTargetClaim = (s: Observable<Claim[]>): Observable<Claim> => {
    const questionaryClaims = s.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Pending));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Review));
    return combineLatest([pendingClaims, reviewClaims]).pipe(takeClaimByPriority);
};
