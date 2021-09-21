import { InternationalBankAccount } from '@dsh/api-codegen/claim-management';

import { PayoutToolForm } from '../../../components/payout-tool-form/payout-tool-form.component';

export function payoutToolFormToInternationalBankAccount(
    form: PayoutToolForm
): Required<Pick<InternationalBankAccount, 'iban' | 'number' | 'bank'>> {
    return {
        iban: form.iban,
        number: form.number,
        bank: {
            abaRtn: form.abaRtn,
            address: form.address,
            bic: form.bic,
            name: form.name,
            country: form.country,
        },
    };
}
