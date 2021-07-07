import moment from 'moment';

import { DateRange } from '../types/date-range';
import { Preset } from '../types/preset';

export function getPresetByDateRange({ start, end }: DateRange): Preset {
    if (start && end && end.local().isSame(moment(), 'd')) {
        const diff = moment().diff(start.local(), 'h');
        if (diff === 24) return Preset.Last24hour;
        if (diff === 30 * 24) return Preset.Last30days;
        if (diff === 90 * 24) return Preset.Last90days;
        if (diff === 365 * 24) return Preset.Last365days;
    }
    return Preset.Custom;
}
