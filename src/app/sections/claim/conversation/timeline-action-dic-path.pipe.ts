import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info';

@Pipe({ name: 'timelineActionDicPath' })
export class TimelineActionDicPathPipe implements PipeTransform {
    transform(value: TimelineAction): string {
        return this.getTimelineActionDicPath(value);
    }

    getTimelineActionDicPath(action: TimelineAction): string {
        const timelineActionDicPathPart = ({
            [TimelineAction.statusPending]: 'pending',
            // [TimelineAction.statusPendingAcceptance]: 'pendingAcceptance',
            [TimelineAction.statusReview]: 'review',
            [TimelineAction.statusRevoked]: 'revoked',
            [TimelineAction.statusDenied]: 'denied',
            [TimelineAction.statusAccepted]: 'accepted',
            [TimelineAction.claimCreated]: 'claimCreated',
            [TimelineAction.filesAdded]: 'documentAdded',
            [TimelineAction.commentAdded]: 'commentAdded',
            [TimelineAction.changesAdded]: 'changesAdded'
        } as const)[action];
        return timelineActionDicPathPart && `${timelineActionDicPathPart}`;
    }
}
