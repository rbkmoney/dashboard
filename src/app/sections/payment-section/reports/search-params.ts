import { Report } from '../../../api-codegen/anapi';

export interface SearchParams {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    partyID: string;
    shopID?: string;
}
