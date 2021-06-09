import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info';

@Pipe({
    name: 'actionIcon',
})
export class ActionIconPipe implements PipeTransform {
    transform(action: TimelineAction): string {
        return (
            {
                [TimelineAction.StatusPending]: 'visibility',
                [TimelineAction.StatusReview]: 'forward',
                [TimelineAction.StatusRevoked]: 'circle_slash',
                [TimelineAction.StatusDenied]: 'circle_slash',
                [TimelineAction.StatusAccepted]: 'smile',
                [TimelineAction.FilesAdded]: 'attach',
                [TimelineAction.CommentAdded]: 'mode_comment',
                [TimelineAction.ChangesAdded]: 'add',
            } as const
        )[action];
    }
}
