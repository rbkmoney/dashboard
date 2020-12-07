import { Injectable } from '@angular/core';
import isNil from 'lodash.isnil';
import { forkJoin, Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import {
    createContractorParamsModification,
    createRussianBankAccountModification,
    createRussianContractPayoutToolModification,
    createRussianLegalEntityModification,
    createShopCreationModification,
    makeShopDetails,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';
import { UuidGeneratorService } from '@dsh/app/shared/services/uuid-generator/uuid-generator.service';

import { Claim, PartyModification } from '../../../../../../../../api-codegen/claim-management';
import { RussianShopCreateData } from '../../types/russian-shop-create-data';

@Injectable()
export class CreateRussianShopEntityService {
    constructor(private claimsService: ClaimsService, private uuidGenerator: UuidGeneratorService) {}

    createShop(creationData: RussianShopCreateData): Observable<Claim> {
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
        const contractorID = this.uuidGenerator.generateUUID();
        const contractID = this.uuidGenerator.generateUUID();
        const shopID = this.uuidGenerator.generateUUID();

        let payoutToolID = this.uuidGenerator.generateUUID();
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
