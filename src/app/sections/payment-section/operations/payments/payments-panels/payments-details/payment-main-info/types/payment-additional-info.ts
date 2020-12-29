import { TransactionInfo } from '@dsh/api-codegen/capi';
import { AtLeastOneOf } from '@dsh/type-utils';

export type PaymentAdditionalInfo = AtLeastOneOf<{
    transactionInfo: TransactionInfo;
    externalID: string;
}>;
