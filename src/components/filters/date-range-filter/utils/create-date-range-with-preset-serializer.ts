import isNil from 'lodash-es/isNil';
import moment from 'moment';

import { Serializer } from '@dsh/app/shared/services/query-params/types/serializer';

import { DateRangeWithPreset } from '../types/date-range-with-preset';
import { Preset } from '../types/preset';
import { createDateRangeWithPreset } from './create-date-range-with-preset';

export function createDateRangeWithPresetSerializer(id = 'dr'): Serializer<DateRangeWithPreset> {
    return {
        id,
        serialize: (dateRange) =>
            dateRange.preset && dateRange.preset !== Preset.Custom
                ? dateRange.preset
                : [
                      dateRange.start ? dateRange.start.utc().format() : '',
                      dateRange.end ? dateRange.end.utc().format() : '',
                  ].join(','),
        deserialize: (str) => {
            if (Object.values(Preset).includes(str as Preset)) return createDateRangeWithPreset(str as Preset);
            const [startStr, endStr] = str.split(',');
            const start = moment(startStr);
            const end = moment(endStr);
            return {
                start: startStr && start.isValid() ? start : null,
                end: endStr && end.isValid() ? end : null,
                preset: Preset.Custom,
            };
        },
        recognize: (v) =>
            typeof v === 'object' &&
            // eslint-disable-next-line no-prototype-builtins
            v.hasOwnProperty('start') &&
            // eslint-disable-next-line no-prototype-builtins
            v.hasOwnProperty('end') &&
            (isNil(v.start) || moment.isMoment(v.start)) &&
            (isNil(v.end) || moment.isMoment(v.end)),
    };
}
