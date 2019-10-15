import { SearchParams } from '../search-params';
import { Report } from '../../../../api-codegen/anapi';

export function toSearchParams(params: any): SearchParams {
    const result = { ...params };
    delete result.reportType;
    result.reportTypes = params.reportType ? [params.reportType] : Object.values(Report.ReportTypeEnum);
    result.partyID = '';
    return result;
}
