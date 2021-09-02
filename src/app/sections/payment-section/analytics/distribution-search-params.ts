import { PaymentInstitution } from '@dsh/api-codegen/capi';

export interface DistributionSearchParams {
    fromTime: string;
    toTime: string;
    shopIDs?: string[];
    realm: PaymentInstitution.RealmEnum;
}
