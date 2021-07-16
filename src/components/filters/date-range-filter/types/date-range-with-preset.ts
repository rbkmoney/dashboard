import { DateRange } from './date-range';
import { Preset } from './preset';

export interface DateRangeWithPreset extends DateRange {
    preset?: Preset;
}
