import { Report } from '@dsh/api-codegen/anapi';

export interface SearchFiltersParams {
    fromTime: string;
    toTime: string;
    reportTypes?: Report.ReportTypeEnum[];
}
