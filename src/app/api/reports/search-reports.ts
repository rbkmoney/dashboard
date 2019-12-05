import { Report } from '../../api-codegen/anapi';

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    shopID?: string;
    continuationToken?: string;
}
