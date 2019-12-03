import { Component, Input } from '@angular/core';

import { TimelineAction } from '../to-timeline-info';

@Component({
    selector: 'dsh-timeline-action-icon',
    templateUrl: 'timeline-action-icon.component.html'
})
export class TimelineActionIconComponent {
    @Input() action: TimelineAction;

    getTimelineActionIconName(action: TimelineAction) {
        return ({
            [TimelineAction.statusPending]: 'visibility',
            [TimelineAction.statusReview]: 'forward',
            [TimelineAction.statusRevoked]: 'circle_slash',
            [TimelineAction.statusDenied]: 'circle_slash',
            [TimelineAction.statusAccepted]: 'smile',
            [TimelineAction.claimCreated]: 'create',
            [TimelineAction.filesAdded]: 'attach',
            [TimelineAction.commentAdded]: 'mode_comment',
            [TimelineAction.changesAdded]: 'add'
        } as const)[action];
    }
}
