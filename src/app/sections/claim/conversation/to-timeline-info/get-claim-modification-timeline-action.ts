import {
    ClaimModificationType,
    FileModification,
    FileModificationUnit,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';
import {
    isCommentModificationUnit,
    isDocumentModificationUnit,
    isFileModificationUnit,
    isStatusModificationUnit,
} from '@dsh/api/claims';

import { TimelineAction } from './model';

function getStatusModificationTimelineAction(unit: StatusModificationUnit): TimelineAction | null {
    const Status = StatusModificationUnit.StatusEnum;
    switch (unit.status) {
        case Status.Accepted:
            return TimelineAction.StatusAccepted;
        case Status.Denied:
            return TimelineAction.StatusDenied;
        case Status.Pending:
            return TimelineAction.StatusPending;
        case Status.Review:
            return TimelineAction.StatusReview;
        case Status.Revoked:
            return TimelineAction.StatusRevoked;
        case Status.PendingAcceptance:
            return null;
    }
}

function getFileModificationTimelineAction(unit: FileModificationUnit): TimelineAction {
    const Type = FileModification.FileModificationTypeEnum;
    switch (unit.fileModification.fileModificationType) {
        case Type.FileCreated:
            return TimelineAction.FilesAdded;
        case Type.FileDeleted:
            return TimelineAction.FilesDeleted;
    }
}

export function getClaimModificationTimelineAction(m: ClaimModificationType): TimelineAction | null {
    if (isFileModificationUnit(m)) {
        return getFileModificationTimelineAction(m);
    } else if (isStatusModificationUnit(m)) {
        return getStatusModificationTimelineAction(m);
    } else if (isDocumentModificationUnit(m)) {
        return TimelineAction.ChangesAdded;
    } else if (isCommentModificationUnit(m)) {
        return TimelineAction.CommentAdded;
    }
    throw new Error(`Unknown claimModificationType: ${m.claimModificationType}`);
}
