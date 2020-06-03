import { FormParams } from './form-params';
import { QueryParams } from './query-params';

export function toQueryParams({ date, shopIDs, ...params }: FormParams): QueryParams {
    return {
        ...params,
        shopIDs: shopIDs?.length ? shopIDs : null,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
