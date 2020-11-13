import { Report } from '../../api-codegen/anapi';
import { PaymentInstitutionRealm } from '../model';

export interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    paymentInstitutionRealm?: PaymentInstitutionRealm;
    shopIDs?: string[];
    continuationToken?: string;
}
