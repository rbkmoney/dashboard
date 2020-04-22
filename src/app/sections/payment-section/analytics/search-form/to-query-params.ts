import { FormParams } from './form-params';
import { QueryParams } from './query-params';

export function toQueryParams({ date, ...params }: FormParams): QueryParams {
    return {
        ...params,
        fromTime: date?.begin.utc().format(),
        toTime: date?.end.utc().format(),
        period: date?.period
    };
}
