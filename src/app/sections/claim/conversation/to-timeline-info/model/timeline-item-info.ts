import { StatusColor } from '../../../../../theme-manager';
import { TimelineAction } from './timeline-action';
import { Author } from './author';
import { Modification } from '../../../../../api-codegen/claim-management';

export interface TimelineItemInfo {
    action: TimelineAction;
    author: Author;
    createdAt: string;
    modification?: Modification;
    color?: StatusColor;
}
