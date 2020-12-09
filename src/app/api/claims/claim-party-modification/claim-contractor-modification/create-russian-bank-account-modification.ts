import { RussianBankAccount } from '../../../../api-codegen/claim-management';

export function createRussianBankAccountModification(params: RussianBankAccount): RussianBankAccount {
    return {
        payoutToolModificationType: 'RussianBankAccount' as any, // wrong types
        payoutToolType: 'RussianBankAccount',
        ...params,
    };
}
