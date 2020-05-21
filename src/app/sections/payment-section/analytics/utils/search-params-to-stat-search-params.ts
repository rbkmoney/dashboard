import moment from 'moment';

import { Period } from '@dsh/components/form-controls';

import { SearchParams } from '../search-params';
import { StatSearchParams } from '../stat-search-params';

export const searchParamsToStatSearchParams = ({
    fromTime,
    toTime,
    shopIDs,
    period,
}: SearchParams): { current: StatSearchParams; previous: StatSearchParams } => {
    const current: StatSearchParams = { fromTime, toTime, shopIDs };
    const previous = getPreviousParams(fromTime, toTime, shopIDs, period);
    return { current, previous };
};

const getPreviousParams = (
    currentFromTime: string,
    currentToTime: string,
    shopIDs: string[],
    period: Period
): StatSearchParams => {
    let fromTime = moment(currentFromTime);
    let toTime = moment(currentToTime);
    switch (period) {
        case 'year': {
            fromTime = fromTime.subtract(1, 'year');
            toTime = fromTime.clone().endOf('year');
            break;
        }
        case '3month': {
            fromTime = fromTime.subtract(3, 'month');
            toTime = fromTime.clone().add(2, 'month').endOf('month');
            break;
        }
        case 'month': {
            fromTime = fromTime.subtract(1, 'month');
            toTime = fromTime.clone().endOf('month');
            break;
        }
        case 'week': {
            fromTime = fromTime.subtract(1, 'week');
            toTime = fromTime.clone().endOf('week');
            break;
        }
        case 'day': {
            fromTime = fromTime.subtract(1, 'day');
            toTime = fromTime.clone().endOf('day');
            break;
        }
    }
    return { fromTime: fromTime.utc().format(), toTime: toTime.utc().format(), shopIDs };
};
