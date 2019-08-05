import {
    ClaimModification,
    DocumentModificationUnit,
    DocumentModification,
    StatusModificationUnit,
    StatusModification,
    FileModificationUnit,
    FileModification,
    CommentModificationUnit,
    CommentModification
} from '../../../../api/claim-management';
import { TimelineAction } from './timeline-action';
import { SpecificModificationUnit, getIsSpecificModificationUnit } from './specific-modification-unit';

const isClaimModificationUnit = getIsSpecificModificationUnit<ClaimModification>();

function getDocumentModificationTimelineAction(
    unit: SpecificModificationUnit<DocumentModificationUnit>
): TimelineAction {
    switch (unit.modification.modification.documentModificationType) {
        case DocumentModification.DocumentModificationTypeEnum.DocumentCreated:
            return TimelineAction.claimCreated;
    }
}

function getStatusModificationTimelineAction({
    modification: { status, modification }
}: SpecificModificationUnit<StatusModificationUnit>): TimelineAction {
    const Status = StatusModificationUnit.StatusEnum;
    switch (modification.statusModificationType) {
        case StatusModification.StatusModificationTypeEnum.StatusChanged:
            switch (status) {
                case Status.Accepted:
                    return TimelineAction.statusAccepted;
                case Status.Denied:
                    return TimelineAction.statusDenied;
                case Status.Pending:
                    return TimelineAction.statusPending;
                case Status.PendingAcceptance:
                    return TimelineAction.statusPendingAcceptance;
                case Status.Review:
                    return TimelineAction.statusReview;
                case Status.Revoked:
                    return TimelineAction.statusRevoked;
            }
    }
}

function getFileModificationTimelineAction(unit: SpecificModificationUnit<FileModificationUnit>): TimelineAction {
    switch (unit.modification.modification.fileModificationType) {
        case FileModification.FileModificationTypeEnum.FileCreated:
            return TimelineAction.documentsAdded;
    }
}

function getCommentModificationTimelineAction(unit: SpecificModificationUnit<CommentModificationUnit>): TimelineAction {
    switch (unit.modification.modification.commentModificationType) {
        case CommentModification.CommentModificationTypeEnum.CommentCreated:
            return TimelineAction.commentAdded;
    }
}

export function getClaimModificationTimelineAction(unit: SpecificModificationUnit<ClaimModification>): TimelineAction {
    if (isClaimModificationUnit<DocumentModificationUnit>(unit, 'documentModificationType')) {
        return getDocumentModificationTimelineAction(unit);
    } else if (isClaimModificationUnit<StatusModificationUnit>(unit, 'statusModificationType')) {
        return getStatusModificationTimelineAction(unit);
    } else if (isClaimModificationUnit<FileModificationUnit>(unit, 'fileModificationType')) {
        return getFileModificationTimelineAction(unit);
    } else if (isClaimModificationUnit<CommentModificationUnit>(unit, 'commentModificationType')) {
        return getCommentModificationTimelineAction(unit);
    }
    console.error('Claim modification unidentified');
}
