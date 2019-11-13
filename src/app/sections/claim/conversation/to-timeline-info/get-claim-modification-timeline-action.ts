import get from 'lodash.get';
import {
    ClaimModification,
    DocumentModificationUnit,
    StatusModificationUnit,
    FileModificationUnit,
    CommentModificationUnit
} from '../../../../api-codegen/claim-management';
import { TimelineAction } from './timeline-action';
import { SpecificModificationUnit } from '../../../../api/claims/utils';

function getDocumentModificationTimelineAction(unit: DocumentModificationUnit): TimelineAction {
    switch (unit.documentModification.documentModificationType) {
        case 'DocumentCreated':
            return TimelineAction.claimCreated;
    }
}

function getStatusModificationTimelineAction(unit: StatusModificationUnit): TimelineAction {
    const Status = StatusModificationUnit.StatusEnum;
    switch (unit.statusModification.statusModificationType) {
        case 'StatusChanged':
            switch (unit.status) {
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

function getFileModificationTimelineAction(unit: FileModificationUnit): TimelineAction {
    switch (unit.fileModification.fileModificationType) {
        case 'FileCreated':
            return TimelineAction.documentsAdded;
    }
}

function getCommentModificationTimelineAction(unit: CommentModificationUnit): TimelineAction {
    switch (unit.commentModification.commentModificationType) {
        case 'CommentCreated':
            return TimelineAction.commentAdded;
    }
}

export function getClaimModificationTimelineAction(unit: SpecificModificationUnit<ClaimModification>): TimelineAction {
    const modification = get(unit, ['modification', 'claimModificationType']);
    if (!modification) {
        throw new Error('Modification unit is incomplete');
    }
    switch (modification.claimModificationType) {
        case 'DocumentModificationUnit':
            return getDocumentModificationTimelineAction(modification as DocumentModificationUnit);
        case 'StatusModificationUnit':
            return getStatusModificationTimelineAction(modification as StatusModificationUnit);
        case 'FileModificationUnit':
            return getFileModificationTimelineAction(modification as FileModificationUnit);
        case 'CommentModificationUnit':
            return getCommentModificationTimelineAction(modification as CommentModificationUnit);
    }
    throw new Error('Claim modification unidentified');
}
