import { StatusColor } from '../theme-manager';

export function statusMapToColor(status: string): StatusColor {
    return {
        pending: StatusColor.pending,
        pendingAcceptance: StatusColor.pending,
        review: StatusColor.neutral,
        revoked: StatusColor.warn,
        denied: StatusColor.warn,
        accepted: StatusColor.success
    }[status];
}

export function getClaimStatusViewInfo(status: string) {
    return {
        status: `common.claim.status.${status}`,
        color: statusMapToColor(status)
    };
}
