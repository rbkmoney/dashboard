import { SplitUnit } from '@dsh/api-codegen/anapi/swagger-codegen';
import { PaymentInstitution } from '@dsh/api-codegen/capi';

export interface SearchParamsWithSplitUnit {
    fromTime: string;
    toTime: string;
    splitUnit: SplitUnit;
    shopIDs?: string[];
    realm: PaymentInstitution.RealmEnum;
}
