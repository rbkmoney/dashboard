import { BankAccount, Contract } from '@dsh/api-codegen/capi';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';

export interface RussianShopCreateData {
    shopDetails: ShopDetailsForm;
    contract: Contract;
    payoutToolID: string | null;
    bankAccount: BankAccount;
}
