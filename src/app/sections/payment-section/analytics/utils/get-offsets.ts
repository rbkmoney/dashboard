import moment, { Moment } from 'moment';

import { SplitUnit } from '@dsh/api-codegen/anapi/swagger-codegen';

export const getOffsets = (fromTime: string, toTime: string, splitUnit: SplitUnit): number[] => {
    let current: Moment;
    switch (splitUnit) {
        case 'month':
            current = moment(fromTime).subtract(moment(fromTime).date() - 1, 'd');
            break;
        case 'week':
            current = moment(fromTime).subtract(moment(fromTime).weekday(), 'd');
            break;
        default:
            current = moment(fromTime);
            break;
    }
    if (splitUnit !== 'hour') {
        current.add(getUtcOffsetHours(), 'h');
    }
    const to = moment(toTime);
    const offsets: number[] = [];
    while (current < to) {
        offsets.push(current.valueOf());
        current.add(1, splitUnit);
    }
    return offsets;
};

const getUtcOffsetHours = (): number => Math.round(moment().utcOffset() / 60);
