import { Component, Input } from '@angular/core';

import { TimelineAction } from '../to-timeline-info';

@Component({
    selector: 'dsh-timeline-action-icon',
    templateUrl: 'timeline-action-icon.component.html'
})
export class TimelineActionIconComponent {
    @Input()
    action: TimelineAction;

    getTimelineActionIconName(action: TimelineAction) {
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
}
