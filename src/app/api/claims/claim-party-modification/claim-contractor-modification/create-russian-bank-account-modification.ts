import { RussianBankAccount } from '../../../../api-codegen/claim-management';

export function createRussianBankAccountModification(params: RussianBankAccount): RussianBankAccount {
    return {
        payoutToolModificationType: 'RussianBankAccount',
        payoutToolType: 'RussianBankAccount',
        ...params,
    };
}
