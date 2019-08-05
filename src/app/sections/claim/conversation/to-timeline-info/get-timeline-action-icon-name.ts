import { TimelineAction } from './timeline-action';

export function getTimelineActionIconName(action: TimelineAction) {
    return ({
        [TimelineAction.statusPending]: 'sentiment_satisfied',
        [TimelineAction.statusPendingAcceptance]: 'sentiment_satisfied',
        [TimelineAction.statusReview]: 'sentiment_satisfied',
        [TimelineAction.statusRevoked]: 'mood_bad',
        [TimelineAction.statusDenied]: 'mood_bad',
        [TimelineAction.statusAccepted]: 'insert_emoticon',
        [TimelineAction.claimCreated]: 'add',
        [TimelineAction.documentsAdded]: 'attach_file',
        [TimelineAction.commentAdded]: 'mode_comment',
        [TimelineAction.changesAdded]: 'create'
    } as const)[action];
}
