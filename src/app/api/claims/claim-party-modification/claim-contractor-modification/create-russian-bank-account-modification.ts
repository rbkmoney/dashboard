import { PayoutToolInfo, RussianBankAccount } from '@dsh/api-codegen/claim-management';

export function createRussianBankAccountModification(
    params: Omit<RussianBankAccount, 'payoutToolType'>
): RussianBankAccount {
    return {
        payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
        ...params,
    };
}
