import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info';

@Pipe({
    name: 'actionIcon',
})
export class ActionIconPipe implements PipeTransform {
    transform(action: TimelineAction): string {
        return (
            {
                [TimelineAction.StatusPending]: 'plus',
                [TimelineAction.StatusReview]: 'check',
                [TimelineAction.StatusRevoked]: 'x',
                [TimelineAction.StatusDenied]: 'x',
                [TimelineAction.StatusAccepted]: 'check-all',
                [TimelineAction.FilesAdded]: 'plus',
                [TimelineAction.CommentAdded]: 'plus',
                [TimelineAction.ChangesAdded]: 'plus',
            } as const
        )[action];
    }
}
