import { Report } from '../../../../api-codegen/anapi';

export interface SearchFiltersParams {
    fromTime: string;
    toTime: string;
    reportTypes?: Report.ReportTypeEnum[];
}
