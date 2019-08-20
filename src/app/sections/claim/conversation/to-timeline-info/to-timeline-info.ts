import * as moment from 'moment';

import { ModificationUnit } from '../../../../api/claim-management';
import { TimelineItemInfo } from './timeline-item-info';
import { toTimelineItemInfo } from './to-timeline-item-info';

function sortUnits(units: ModificationUnit[]): ModificationUnit[] {
    return units.sort(({ createdAt: a }, { createdAt: b }) => moment(a).diff(moment(b)));
}

function toModificationUnitBatches(units: ModificationUnit[]): ModificationUnit[][] {
    return units.map(u => [u]);
}

export function toTimelineInfo(units: ModificationUnit[]): TimelineItemInfo[] {
    const sortedUnits = sortUnits(units);
    const batches = toModificationUnitBatches(sortedUnits);
    return batches.map(toTimelineItemInfo);
}
