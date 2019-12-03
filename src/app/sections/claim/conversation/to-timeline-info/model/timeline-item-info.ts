import { TimelineAction } from './timeline-action';
import { Modification, UserInfo } from '../../../../../api-codegen/claim-management';

export interface TimelineItemInfo {
    action: TimelineAction;
    userInfo: UserInfo;
    createdAt: string;
    modifications?: Modification[];
}
