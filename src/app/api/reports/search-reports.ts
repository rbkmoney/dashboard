import { Report } from '@dsh/api-codegen/anapi';
import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    limit: number;
    reportTypes: Report.ReportTypeEnum[];
    paymentInstitutionRealm?: RealmEnum;
    shopIDs?: string[];
    continuationToken?: string;
}
