import { PayoutToolDetailsInternationalBankAccount } from '@dsh/api-codegen/capi';
import { InternationalBankAccount } from '@dsh/api-codegen/claim-management';

export function payoutToolDetailsInternationalBankAccountToInternationalBankAccount(
    form: Omit<PayoutToolDetailsInternationalBankAccount, 'detailsType'>
): Required<Pick<InternationalBankAccount, 'iban' | 'number' | 'bank'>> {
    const { bankDetails } = form;
    return {
        iban: form.iban,
        number: form.number,
        bank: {
            abaRtn: bankDetails.abartn,
            address: bankDetails.address,
            bic: bankDetails.bic,
            name: bankDetails.name,
            country: bankDetails.countryCode,
        },
    };
}
