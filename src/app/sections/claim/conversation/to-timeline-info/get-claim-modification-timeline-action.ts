import { ClaimModificationType, StatusModificationUnit } from '../../../../api-codegen/claim-management';
import { TimelineAction } from './model';

function getStatusModificationTimelineAction(unit: StatusModificationUnit): TimelineAction | null {
    const Status = StatusModificationUnit.StatusEnum;
    switch (unit.status) {
        case Status.Accepted:
            return TimelineAction.statusAccepted;
        case Status.Denied:
            return TimelineAction.statusDenied;
        case Status.Pending:
            return TimelineAction.statusPending;
        case Status.Review:
            return TimelineAction.statusReview;
        case Status.Revoked:
            return TimelineAction.statusRevoked;
        case Status.PendingAcceptance:
            return null;
    }
}

export function getClaimModificationTimelineAction(m: ClaimModificationType): TimelineAction | null {
    switch (m.claimModificationType) {
        case 'DocumentModificationUnit':
            return TimelineAction.changesAdded;
        case 'StatusModificationUnit':
            return getStatusModificationTimelineAction(m as StatusModificationUnit);
        case 'FileModificationUnit':
            return TimelineAction.filesAdded;
        case 'CommentModificationUnit':
            return TimelineAction.commentAdded;
    }
    throw new Error(`Unknown claimModificationType: ${m.claimModificationType}`);
}
