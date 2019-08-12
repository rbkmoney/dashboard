import { TimelineAction } from './timeline-action';
import { StatusColor } from '../../../../theme-manager';

export function getTimelineActionColor(action: TimelineAction): StatusColor {
    return {
        [TimelineAction.statusPending]: StatusColor.pending,
        [TimelineAction.statusPendingAcceptance]: StatusColor.pending,
        [TimelineAction.statusReview]: StatusColor.neutral,
        [TimelineAction.statusRevoked]: StatusColor.warn,
        [TimelineAction.statusDenied]: StatusColor.warn,
        [TimelineAction.statusAccepted]: StatusColor.success
    }[action];
}
