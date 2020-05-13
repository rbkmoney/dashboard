import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toSearchParams({ date, ...params }: FormParams): SearchParams {
    return {
        ...params,
        shopIDs: params.shopIDs?.length ? params.shopIDs : null,
        fromTime: date?.begin.utc().format(),
        toTime: date?.end.utc().format(),
        period: date?.period
    };
}
