import { TimelineAction } from './timeline-action';

export function getTimelineActionName(action: TimelineAction): string {
    const timelineActionName = ({
        [TimelineAction.statusPending]: 'pending',
        [TimelineAction.statusPendingAcceptance]: 'pendingAcceptance',
        [TimelineAction.statusReview]: 'review',
        [TimelineAction.statusRevoked]: 'revoked',
        [TimelineAction.statusDenied]: 'denied',
        [TimelineAction.statusAccepted]: 'accepted',
        [TimelineAction.claimCreated]: 'claimCreated',
        [TimelineAction.documentsAdded]: 'documentAdded',
        [TimelineAction.commentAdded]: 'commentAdded',
        [TimelineAction.changesAdded]: 'changesAdded'
    } as const)[action];
    return timelineActionName ? `sections.claim.conversation.to-timeline-info.action.${timelineActionName}` : undefined;
}
