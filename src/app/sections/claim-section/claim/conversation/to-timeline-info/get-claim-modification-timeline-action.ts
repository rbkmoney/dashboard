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
    const status = StatusModificationUnit.StatusEnum;
    switch (unit.status) {
        case status.Accepted:
            return TimelineAction.StatusAccepted;
        case status.Denied:
            return TimelineAction.StatusDenied;
        case status.Pending:
            return TimelineAction.StatusPending;
        case status.Review:
            return TimelineAction.StatusReview;
        case status.Revoked:
            return TimelineAction.StatusRevoked;
        case status.PendingAcceptance:
            return null;
    }
}

function getFileModificationTimelineAction(unit: FileModificationUnit): TimelineAction {
    const type = FileModification.FileModificationTypeEnum;
    switch (unit.fileModification.fileModificationType) {
        case type.FileCreated:
            return TimelineAction.FilesAdded;
        case type.FileDeleted:
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
