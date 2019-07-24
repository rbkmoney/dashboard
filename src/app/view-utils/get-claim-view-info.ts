import { StatusColor } from '../theme-manager';
import { StatusModificationUnit } from '../api/claim-management';

export function statusMapToColor(status: StatusModificationUnit.StatusEnum): StatusColor {
    return {
        pending: StatusColor.pending,
        pendingAcceptance: StatusColor.pending,
        review: StatusColor.neutral,
        revoked: StatusColor.warn,
        denied: StatusColor.warn,
        accepted: StatusColor.success
    }[status];
}

export function getClaimStatusViewInfo(status: StatusModificationUnit.StatusEnum) {
    return {
        status: `common.claim.status.${status}`,
        color: statusMapToColor(status)
    };
}
