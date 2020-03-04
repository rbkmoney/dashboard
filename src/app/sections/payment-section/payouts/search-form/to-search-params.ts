import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toSearchParams({ fromTime, toTime, ...params }: FormParams): SearchParams {
    return {
        ...params,
        fromTime: fromTime.utc().format(),
        toTime: toTime.utc().format()
    };
}
