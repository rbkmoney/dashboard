import moment, { Moment } from 'moment';

import { DateRange } from '../types/date-range';
import { Preset } from '../types/preset';

export function createDateRangeByPreset(preset: Preset): DateRange {
    let start: Moment = moment();
    switch (preset) {
        case Preset.Last24hour:
            start = start.subtract(1, 'd');
            break;
        case Preset.Last30days:
            start = start.subtract(30, 'd');
            break;
        case Preset.Last90days:
            start = start.subtract(90, 'd');
            break;
        case Preset.Last365days:
            start = start.subtract(365, 'd');
            break;
    }
    return { start, end: moment().endOf('d') };
}
