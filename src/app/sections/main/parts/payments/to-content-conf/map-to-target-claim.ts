import { combineLatest, Observable } from 'rxjs';

import { Claim } from '@dsh/api-codegen/claim-management';
import { CLAIM_STATUS } from '@dsh/api/claims';

import { filterByProp } from '../../../../../custom-operators';
import { filterQuestionaryClaims, takeClaimByPriority } from '../operators';

export const mapToTargetClaim = (s: Observable<Claim[]>): Observable<Claim> => {
    const questionaryClaims = s.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', CLAIM_STATUS.Pending));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', CLAIM_STATUS.Review));
    return combineLatest([pendingClaims, reviewClaims]).pipe(takeClaimByPriority);
};
