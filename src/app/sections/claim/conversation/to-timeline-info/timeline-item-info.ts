import { StatusColor } from '../../../../theme-manager';
import { TimelineAction } from './timeline-action';
import { Author } from './author';

export interface TimelineItemInfo {
    action: TimelineAction;
    author: Author;
    createdAt: string;
    color?: StatusColor;
}
