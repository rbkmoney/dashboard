import { Report } from '../../api-codegen/anapi';

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    partyID: string;
    shopID?: string;
    continuationToken?: string;
}
