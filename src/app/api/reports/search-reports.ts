import { Report } from '@dsh/api-codegen/anapi';

import { PaymentInstitutionRealm } from '../model';

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    limit: number;
    reportTypes: Report.ReportTypeEnum[];
    paymentInstitutionRealm?: PaymentInstitutionRealm;
    shopIDs?: string[];
    continuationToken?: string;
}
