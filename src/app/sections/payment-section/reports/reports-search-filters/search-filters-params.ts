import { Report } from '@dsh/api-codegen/anapi';
import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchFiltersParams {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    reportTypes?: Report.ReportTypeEnum[];
}
