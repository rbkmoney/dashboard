import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toSearchParams({ date, ...params }: FormParams): SearchParams {
    return {
        ...params,
        fromTime: date.begin.utc().toDate(),
        toTime: date.end.utc().toDate(),
        period: date.period
    };
}
