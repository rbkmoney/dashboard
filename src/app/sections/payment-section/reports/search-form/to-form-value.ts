import moment from 'moment';

import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { FormParams } from './form-params';
import { QueryParams } from './query-params';

export function toFormValue(
    { fromTime, toTime, reportType, shopIDs, ...params }: QueryParams,
    defaultParams: FormParams
): FormParams {
    return {
        ...defaultParams,
        ...params,
        shopIDs: shopIDs ? (Array.isArray(shopIDs) ? shopIDs : [shopIDs]) : null,
        date: {
            begin: fromTime ? moment(fromTime) : defaultParams.date.begin,
            end: toTime ? moment(toTime) : defaultParams.date.end,
        },
        reportType: reportType ? (reportType as Report.ReportTypeEnum) : defaultParams.reportType,
    };
}
