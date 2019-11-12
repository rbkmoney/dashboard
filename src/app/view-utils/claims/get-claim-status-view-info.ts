import { StatusColor } from '../../theme-manager';
import { StatusModificationUnit } from '../../api-codegen/claim-management';

type ClaimStatus = StatusModificationUnit.StatusEnum;

export interface ClaimStatusViewInfo {
    status: string;
    color: StatusColor;
}

function statusMapToColor(status: ClaimStatus): StatusColor {
    return {
        pending: StatusColor.pending,
        pendingAcceptance: StatusColor.pending,
        review: StatusColor.neutral,
        revoked: StatusColor.warn,
        denied: StatusColor.warn,
        accepted: StatusColor.success
    }[status];
}

export const getClaimStatusViewInfo = (status: ClaimStatus): ClaimStatusViewInfo => ({
    status: `${status}`,
    color: statusMapToColor(status)
});
