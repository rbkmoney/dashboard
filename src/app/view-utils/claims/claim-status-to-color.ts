import { StatusModificationUnit } from '../../api-codegen/claim-management';
import { StatusColor } from '../../theme-manager';

type ClaimStatus = StatusModificationUnit.StatusEnum;

const statusMapToColor: { [status in ClaimStatus]: StatusColor } = {
    pending: StatusColor.pending,
    pendingAcceptance: StatusColor.pending,
    review: StatusColor.neutral,
    revoked: StatusColor.warn,
    denied: StatusColor.warn,
    accepted: StatusColor.success
};

export const claimStatusToColor = (status: ClaimStatus): StatusColor => statusMapToColor[status];
