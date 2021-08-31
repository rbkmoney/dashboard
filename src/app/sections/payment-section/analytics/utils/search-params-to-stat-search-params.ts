import moment from 'moment';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import { SearchParams } from '../search-params';
import { StatSearchParams } from '../stat-search-params';

export interface StatStatSearchParams {
    current: StatSearchParams;
    previous: StatSearchParams;
    realm: PaymentInstitution.RealmEnum;
}

export const searchParamsToStatSearchParams = ({
    fromTime,
    toTime,
    shopIDs,
    realm,
}: SearchParams): StatStatSearchParams => {
    const current: StatSearchParams = { fromTime, toTime, shopIDs };
    const previous = getPreviousParams(fromTime, toTime, shopIDs);
    return { current, previous, realm };
};

const getPreviousParams = (currentFromTime: string, currentToTime: string, shopIDs: string[]): StatSearchParams => {
    const currFrom = moment(currentFromTime);
    const currTo = moment(currentToTime);
    const timeDiff = currTo.diff(currFrom);
    const toTime = currFrom.clone().subtract(1, 'ms');
    const fromTime = toTime.clone().subtract(timeDiff, 'ms');
    return { fromTime: fromTime.utc().format(), toTime: toTime.utc().format(), shopIDs };
};
