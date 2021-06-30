import { StatusModificationUnit } from '@dsh/api-codegen/claim-management';

export const OPTION_LABELS: { [N in StatusModificationUnit.StatusEnum]: string } = {
    pending: 'pending',
    review: 'review',
    pendingAcceptance: 'pendingAcceptance',
    accepted: 'accepted',
    denied: 'denied',
    revoked: 'revoked',
};
