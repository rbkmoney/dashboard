import moment from 'moment';

import { SearchParams } from '../search-params';
import { Report } from '../../../../api-codegen/anapi';

interface FormParams {
    fromTime: moment.Moment;
    toTime: moment.Moment;
    reportType: Report.ReportTypeEnum;
    partyID: string;
    shopID?: string;
}

export function toSearchParams({ reportType, fromTime, toTime, ...params }: FormParams): SearchParams {
    return {
        ...params,
        reportTypes: reportType ? [reportType] : Object.values(Report.ReportTypeEnum),
        fromTime: fromTime.utc().format(),
        toTime: toTime.utc().format(),
        partyID: ''
    };
}
