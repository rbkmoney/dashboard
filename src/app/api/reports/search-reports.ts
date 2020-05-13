import { Report } from '../../api-codegen/anapi';

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    shopIDs?: string[];
    continuationToken?: string;
}
