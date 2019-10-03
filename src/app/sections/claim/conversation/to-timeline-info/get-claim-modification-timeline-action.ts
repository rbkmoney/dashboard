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
} from '../../../../api-codegen/claim-management';
import { TimelineAction } from './timeline-action';
import { SpecificModificationUnit } from '../../../../api/claims/utils';

const ClaimModificationType = ClaimModification.ClaimModificationTypeEnum;

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
    if (!unit || !unit.modification || !unit.modification.claimModificationType) {
        throw new Error('Modification unit is incomplete');
    }
    switch (unit.modification.claimModificationType) {
        case ClaimModificationType.DocumentModificationUnit:
            return getDocumentModificationTimelineAction(unit as SpecificModificationUnit<DocumentModificationUnit>);
        case ClaimModificationType.StatusModificationUnit:
            return getStatusModificationTimelineAction(unit as SpecificModificationUnit<StatusModificationUnit>);
        case ClaimModificationType.FileModificationUnit:
            return getFileModificationTimelineAction(unit as SpecificModificationUnit<FileModificationUnit>);
        case ClaimModificationType.CommentModificationUnit:
            return getCommentModificationTimelineAction(unit as SpecificModificationUnit<CommentModificationUnit>);
    }
    throw new Error('Claim modification unidentified');
}
