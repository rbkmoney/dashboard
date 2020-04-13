import { FormParams } from './form-params';

export function toQueryParams({ date, ...params }: FormParams) {
    return {
        ...params,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format()
    };
}
