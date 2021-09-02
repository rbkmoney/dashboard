import { PaymentInstitution } from '@dsh/api-codegen/capi';

export interface SearchParams {
    fromTime: string;
    toTime: string;
    currency: string;
    realm: PaymentInstitution.RealmEnum;
    shopIDs?: string[];
}
