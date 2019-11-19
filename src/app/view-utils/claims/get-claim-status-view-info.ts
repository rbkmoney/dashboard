import { StatusColor } from '../../theme-manager';
import { StatusModificationUnit } from '../../api-codegen/claim-management';

type ClaimStatus = StatusModificationUnit.StatusEnum;

const statusMapToColor: { [status in ClaimStatus]: StatusColor } = {
    pending: StatusColor.pending,
    pendingAcceptance: StatusColor.pending,
    review: StatusColor.neutral,
    revoked: StatusColor.warn,
    denied: StatusColor.warn,
    accepted: StatusColor.success
};

export interface ClaimStatusViewInfo {
    status: string;
    color: StatusColor;
}

export const getClaimStatusViewInfo = (status: ClaimStatus): ClaimStatusViewInfo => ({
    status: `${status}`,
    color: statusMapToColor[status]
});
