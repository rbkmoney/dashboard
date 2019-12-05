import { Report } from '../../api-codegen/anapi';

export interface CreateReportReq {
    fromTime: string;
    toTime: string;
    reportType: Report.ReportTypeEnum;
    shopID?: string;
}
