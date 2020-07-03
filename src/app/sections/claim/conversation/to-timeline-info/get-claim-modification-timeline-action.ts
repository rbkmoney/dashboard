import {
    isCommentModificationUnit,
    isDocumentModificationUnit,
    isFileModificationUnit,
    isStatusModificationUnit,
} from '../../../../api';
import {
    ClaimModificationType,
    FileModification,
    FileModificationUnit,
    StatusModificationUnit,
} from '../../../../api-codegen/claim-management';
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

function geFileModificationTimelineAction(unit: FileModificationUnit): TimelineAction {
    const Type = FileModification.FileModificationTypeEnum;
    switch (unit.fileModification.fileModificationType) {
        case Type.FileCreated:
            return TimelineAction.filesAdded;
        case Type.FileDeleted:
            return TimelineAction.filesDeleted;
    }
}

export function getClaimModificationTimelineAction(m: ClaimModificationType): TimelineAction | null {
    if (isFileModificationUnit(m)) {
        return geFileModificationTimelineAction(m);
    } else if (isStatusModificationUnit(m)) {
        return getStatusModificationTimelineAction(m);
    } else if (isDocumentModificationUnit) {
        return TimelineAction.changesAdded;
    } else if (isCommentModificationUnit) {
        return TimelineAction.commentAdded;
    }
    throw new Error(`Unknown claimModificationType: ${m.claimModificationType}`);
}
