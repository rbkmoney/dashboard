import { Report } from '../../../../api-codegen/anapi';

export interface QueryParams {
    fromTime: string;
    toTime: string;
    reportType: Report.ReportTypeEnum;
    shopIDs?: string[];
}
