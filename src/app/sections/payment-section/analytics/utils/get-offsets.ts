import moment from 'moment';

import { SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';

export const getOffsets = (fromTime: string, toTime: string, splitUnit: SplitUnit): number[] => {
    const current = splitUnit !== 'hour' ? moment(fromTime).add(getUtcOffsetHours(), 'h') : moment(fromTime);
    const to = moment(toTime);
    const offsets: number[] = [];
    while (current < to) {
        offsets.push(current.valueOf());
        current.add(1, splitUnit);
    }
    return offsets;
};

const getUtcOffsetHours = (): number => Math.round(moment().utcOffset() / 60);
