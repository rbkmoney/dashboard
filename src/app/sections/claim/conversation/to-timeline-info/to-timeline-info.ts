import { ModificationUnit } from '../../../../api-codegen/claim-management';
import { TimelineItemInfo } from './timeline-item-info';
import { toTimelineItemInfo } from './to-timeline-item-info';
import { sortUnitsByCreatedAtAsc } from '../../../../api/claims/utils';

function toModificationUnitBatches(units: ModificationUnit[]): ModificationUnit[][] {
    return units.map(u => [u]);
}

export function toTimelineInfo(units: ModificationUnit[]): TimelineItemInfo[] {
    const sortedUnits = sortUnitsByCreatedAtAsc(units);
    const batches = toModificationUnitBatches(sortedUnits);
    return batches.map(toTimelineItemInfo);
}
