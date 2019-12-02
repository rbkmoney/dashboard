import { TimelineAction } from './timeline-action';
import { Author } from './author';
import { Modification } from '../../../../../api-codegen/claim-management';

export interface TimelineItemInfo {
    action: TimelineAction;
    author: Author;
    createdAt: string;
    modifications?: Modification[];
}
