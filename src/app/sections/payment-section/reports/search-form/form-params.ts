import { Report } from '../../../../api-codegen/anapi';
import { Range } from '../../../../form-controls';

export interface FormParams {
    date: Range;
    reportType: Report.ReportTypeEnum;
    shopID?: string;
}
