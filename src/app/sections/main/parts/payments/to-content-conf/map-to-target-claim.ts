import { Observable, combineLatest } from 'rxjs';

import { filterQuestionaryClaims, takeClaimByPriority } from '../operators';
import { filterByProp } from '../../../../../custom-operators';
import { ClaimStatus } from '../../../../../api';
import { Claim } from '../../../../../api-codegen/claim-management';

export const mapToTargetClaim = (s: Observable<Claim[]>): Observable<Claim> => {
    const questionaryClaims = s.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Pending));
    const pendingAcceptanceClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.PendingAcceptance));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Review));
    return combineLatest(pendingClaims, pendingAcceptanceClaims, reviewClaims).pipe(takeClaimByPriority);
};
