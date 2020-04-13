import { Range } from '@dsh/components/form-controls';

import { Report } from '../../../../api-codegen/anapi';

export interface FormParams {
    date: Range;
    reportType: Report.ReportTypeEnum;
    shopID?: string;
}
