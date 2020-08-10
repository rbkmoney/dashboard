import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toSearchParams({ reportType, date, shopIDs, ...params }: FormParams): SearchParams {
    return {
        ...params,
        shopIDs: shopIDs?.length ? shopIDs : null,
        // uncomment if backend is ready reportTypes: reportType ? [reportType] : Object.values(Report.ReportTypeEnum),
        reportTypes: reportType ? [reportType] : ['provisionOfService', 'paymentRegistry'],
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
