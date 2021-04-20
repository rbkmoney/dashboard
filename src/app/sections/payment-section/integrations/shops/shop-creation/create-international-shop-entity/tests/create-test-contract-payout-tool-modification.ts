import isNil from 'lodash-es/isNil';

import { PartyModification } from '@dsh/api-codegen/claim-management';
import { createInternationalContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification/claim-contract-modification/create-international-contract-payout-tool-modification';

import { InternationalShopEntityFormValue } from '../types/international-shop-entity-form-value';

export function createTestContractPayoutToolModification(
    contractID: string,
    payoutToolID: string,
    { payoutTool, correspondentPayoutTool }: InternationalShopEntityFormValue
): PartyModification {
    return createInternationalContractPayoutToolModification(contractID, payoutToolID, {
        iban: payoutTool.iban,
        number: payoutTool.number,
        bank: {
            abaRtn: payoutTool.abaRtn,
            address: payoutTool.address,
            bic: payoutTool.bic,
            name: payoutTool.name,
            country: payoutTool.country,
        },
        correspondentAccount: isNil(correspondentPayoutTool)
            ? null
            : {
                  accountHolder: '', // add ui field or remove it
                  iban: correspondentPayoutTool.iban,
                  number: correspondentPayoutTool.number,
                  bank: {
                      abaRtn: correspondentPayoutTool.abaRtn,
                      address: correspondentPayoutTool.address,
                      bic: correspondentPayoutTool.bic,
                      name: correspondentPayoutTool.name,
                      country: correspondentPayoutTool.country,
                  },
              },
    });
}
