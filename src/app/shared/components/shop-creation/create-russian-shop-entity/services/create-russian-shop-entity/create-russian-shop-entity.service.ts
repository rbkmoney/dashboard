import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { forkJoin, Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Claim, PartyModification } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import {
    createContractCreationModification,
    createRussianBankAccountModification,
    createRussianContractPayoutToolCreationModification,
    createRussianLegalEntityModification,
    createShopCreationModification,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';

import { RussianShopForm } from '../../types/russian-shop-entity';

@Injectable()
export class CreateRussianShopEntityService {
    constructor(private claimsService: ClaimsService, private idGenerator: IdGeneratorService) {}

    createShop(creationData: RussianShopForm): Observable<Claim> {
        return this.claimsService.createClaim(this.createShopCreationModifications(creationData)).pipe(
            switchMap((claim) => {
                return forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)]);
            }),
            pluck(0)
        );
    }

    private createShopCreationModifications({
        shopDetails,
        orgDetails: { created: newContractor, existing: contract },
        bankAccount: { created: bankAccount, existing: payoutTool },
        currency,
        paymentInstitution,
    }: RussianShopForm): PartyModification[] {
        const contractorID = this.idGenerator.uuid();
        const contractID = this.idGenerator.uuid();
        const shopID = this.idGenerator.uuid();
        let payoutToolID = payoutTool?.id;

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
        } = contract?.contractor || { ...newContractor, postAddress: '' };

        const payoutToolBankAccount = payoutTool?.details || bankAccount;

        const result: PartyModification[] = [
            createRussianLegalEntityModification(contractorID, {
                actualAddress,
                russianBankAccount: createRussianBankAccountModification(russianBankAccount),
                inn,
                postAddress,
                registeredName,
                registeredNumber,
                representativeDocument,
                representativeFullName,
                representativePosition,
            }),
            createContractCreationModification(contractID, {
                contractorID,
                paymentInstitution: { id: paymentInstitution?.id ?? 1 },
            }),
        ];
        if (!payoutToolID) {
            payoutToolID = this.idGenerator.uuid();
            result.push(
                createRussianContractPayoutToolCreationModification(
                    contractID,
                    payoutToolID,
                    payoutToolBankAccount,
                    currency
                )
            );
        }
        return [
            ...result,
            createShopCreationModification(shopID, {
                category: {
                    categoryID: shopDetails.category?.categoryID ?? 1,
                },
                location: makeShopLocation({ url: shopDetails.url }),
                details: { name: shopDetails.name },
                contractID,
                payoutToolID,
            }),
        ];
    }
}
