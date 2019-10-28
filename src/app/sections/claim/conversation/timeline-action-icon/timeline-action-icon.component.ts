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
            [TimelineAction.statusPending]: 'smile',
            [TimelineAction.statusPendingAcceptance]: 'smile',
            [TimelineAction.statusReview]: 'smile',
            [TimelineAction.statusRevoked]: 'mood_bad',
            [TimelineAction.statusDenied]: 'mood_bad',
            [TimelineAction.statusAccepted]: 'insert_emoticon',
            [TimelineAction.claimCreated]: 'add',
            [TimelineAction.documentsAdded]: 'attach',
            [TimelineAction.commentAdded]: 'mode_comment',
            [TimelineAction.changesAdded]: 'create'
        } as const)[action];
    }
}
