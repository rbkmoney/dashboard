import { Report } from '../../../../api-codegen/anapi';
import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toSearchParams({ reportType, date, shopIDs, ...params }: FormParams): SearchParams {
    return {
        ...params,
        shopIDs: shopIDs?.length ? shopIDs : null,
        reportTypes: reportType ? [reportType] : Object.values(Report.ReportTypeEnum),
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
