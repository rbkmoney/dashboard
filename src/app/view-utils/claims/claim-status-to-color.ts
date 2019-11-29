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

export const claimStatusToColor = (status: ClaimStatus): StatusColor => statusMapToColor[status];
