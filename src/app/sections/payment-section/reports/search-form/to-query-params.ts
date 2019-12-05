import { FormParams } from './form-params';

export function toQueryParams({ fromTime, toTime, ...params }: FormParams): Partial<Record<keyof FormParams, string>> {
    return {
        ...params,
        fromTime: fromTime.utc().format(),
        toTime: toTime.utc().format()
    };
}
