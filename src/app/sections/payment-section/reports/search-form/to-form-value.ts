import moment from 'moment';

import { FormParams } from './form-params';
import { Report } from '../../../../api-codegen/anapi/swagger-codegen';

export function toFormValue(
    { fromTime, toTime, reportType, ...params }: Record<keyof FormParams, string>,
    defaultParams: FormParams
): FormParams {
    return {
        ...defaultParams,
        ...params,
        fromTime: fromTime ? moment(fromTime) : defaultParams.fromTime,
        toTime: toTime ? moment(toTime) : defaultParams.toTime,
        reportType: reportType ? (reportType as Report.ReportTypeEnum) : defaultParams.reportType
    };
}
