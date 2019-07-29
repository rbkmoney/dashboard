import { StatusColor } from '../../../../theme-manager';
import { getTimelineActionIconName } from './get-timeline-action-icon-name';
import { TimelineAction } from './timeline-action';

export interface TimelineActionInfo {
    action: TimelineAction;
    actionName: string;
    author: string;
    createdAt: string;
    iconName?: ReturnType<typeof getTimelineActionIconName>;
    color?: StatusColor;
}
