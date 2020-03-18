import { Report } from '../../../../api-codegen/anapi';
import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toSearchParams({ reportType, date, ...params }: FormParams): SearchParams {
    return {
        ...params,
        reportTypes: reportType ? [reportType] : Object.values(Report.ReportTypeEnum),
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format()
    };
}
