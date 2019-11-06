import { Moment } from 'moment';

import { Report } from '../../../../api-codegen/anapi';

export interface FormParams {
    fromTime: Moment;
    toTime: Moment;
    reportType: Report.ReportTypeEnum;
    shopID?: string;
}
