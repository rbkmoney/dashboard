import { SearchParams } from '../search-params';
import { Report } from '../../../../api-codegen/anapi';
import { FormParams } from './form-params';

export function toSearchParams({ reportType, fromTime, toTime, ...params }: FormParams): SearchParams {
    return {
        ...params,
        reportTypes: reportType ? [reportType] : Object.values(Report.ReportTypeEnum),
        fromTime: fromTime.utc().format(),
        toTime: toTime.utc().format()
    };
}
