import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info';
import { LocaleDictionaryService } from '../../../locale';

@Pipe({ name: 'timelineActionTitle' })
export class TimelineActionTitlePipe implements PipeTransform {
    constructor(private localeDictionaryService: LocaleDictionaryService) {}

    transform(value: TimelineAction): string {
        return this.localeDictionaryService.mapDictionaryKey(this.getTimelineActionTitle(value));
    }

    getTimelineActionTitle(action: TimelineAction): string {
        const timelineActionTitle = ({
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
        return timelineActionTitle && `sections.claim.conversation.to-timeline-info.action.${timelineActionTitle}`;
    }
}
