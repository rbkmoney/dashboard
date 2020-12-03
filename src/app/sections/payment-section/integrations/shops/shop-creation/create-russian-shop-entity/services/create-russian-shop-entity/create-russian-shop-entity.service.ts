import { Injectable } from '@angular/core';
import isNil from 'lodash.isnil';
import { forkJoin, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import uuid from 'uuid';

import { ClaimsService } from '@dsh/api/claims';
import { createContractorParamsModification } from '@dsh/api/claims/claim-party-modification/claim-contract-modification/create-contractor-params-modification';
import { createRussianContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification/claim-contract-modification/create-russian-contract-payout-tool-modification';
import { createRussianBankAccountModification } from '@dsh/api/claims/claim-party-modification/claim-contractor-modification';
import { createRussianLegalEntityModification } from '@dsh/api/claims/claim-party-modification/claim-contractor-modification/create-russian-legal-entity-modification';
import {
    createShopCreationModification,
    makeShopDetails,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification/claim-shop-modification';

import { Claim, PartyModification } from '../../../../../../../../api-codegen/claim-management';
import { RussianShopCreateData } from '../../types/russian-shop-create-data';

@Injectable()
export class CreateRussianShopEntityService {
    constructor(private claimsService: ClaimsService) {}

    createShop(creationData: RussianShopCreateData) {
        return this.claimsService.createClaim(this.createShopCreationModifications(creationData)).pipe(
            switchMap((claim: Claim) => {
                return forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)]);
            }),
            pluck(0)
        );
    }

    private createShopCreationModifications({
        url,
        name,
        contract,
        payoutToolID: shopPayoutToolID,
        bankAccount: { account, bankName, bankPostAccount, bankBik },
    }: RussianShopCreateData): PartyModification[] {
        const contractorID = uuid();
        const contractID = uuid();
        const shopID = uuid();

        let payoutToolID = uuid();
        const payoutChangeset: PartyModification[] = [];

        if (isNil(shopPayoutToolID)) {
            payoutChangeset.push(
                createRussianContractPayoutToolModification(contractID, payoutToolID, {
                    account,
                    bankName,
                    bankPostAccount,
                    bankBik,
                })
            );
        } else {
            payoutToolID = shopPayoutToolID;
        }

        const {
            actualAddress,
            bankAccount: russianBankAccount,
            inn,
            postAddress,
            registeredName,
            registeredNumber,
            representativeDocument,
            representativeFullName,
            representativePosition,
        } = contract.contractor as any;
        // TODO: add valid type for contractor object

        return [
            createRussianLegalEntityModification(contractorID, {
                actualAddress,
                russianBankAccount: createRussianBankAccountModification(russianBankAccount),
                inn,
                postAddress,
                registeredName,
                registeredNumber,
                representativeDocument,
                representativeFullName,
                representativePosition, // remove any cause representativePosition would be fixed in next update api
            } as any),
            createContractorParamsModification(contractID, {
                contractorID,
            }),
            ...payoutChangeset,
            createShopCreationModification(shopID, {
                category: {
                    shopModificationType: 'CategoryRef' as any, // wrong enum
                    id: 1,
                },
                location: makeShopLocation({ url }),
                details: makeShopDetails({ name }),
                contractID,
                payoutToolID,
            }),
        ];
    }
}
