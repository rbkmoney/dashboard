import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchParams {
    fromTime: string;
    toTime: string;
    realm: RealmEnum;
    shopIDs?: string[];
}
