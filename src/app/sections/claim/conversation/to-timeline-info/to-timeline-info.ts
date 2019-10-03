import { ModificationUnit } from '../../../../api-codegen/claim-management';
import { TimelineItemInfo } from './timeline-item-info';
import { toTimelineItemInfo } from './to-timeline-item-info';
import { sortUnits } from '../../../../api';

function toModificationUnitBatches(units: ModificationUnit[]): ModificationUnit[][] {
    return units.map(u => [u]);
}

export function toTimelineInfo(units: ModificationUnit[]): TimelineItemInfo[] {
    const sortedUnits = sortUnits(units);
    const batches = toModificationUnitBatches(sortedUnits);
    return batches.map(toTimelineItemInfo);
}
