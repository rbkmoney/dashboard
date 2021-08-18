import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { forkJoin, Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Claim, PartyModification, RussianBankAccount, RussianLegalEntity } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import {
    createContractCreationModification,
    createRussianBankAccountModification,
    createRussianContractPayoutToolCreationModification,
    createRussianLegalEntityModification,
    createShopCreationModification,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';

import { RussianShopCreateData } from '../../types/russian-shop-create-data';

@Injectable()
export class CreateRussianShopEntityService {
    constructor(private claimsService: ClaimsService, private idGenerator: IdGeneratorService) {}

    createShop(creationData: RussianShopCreateData): Observable<Claim> {
        return this.claimsService.createClaim(this.createShopCreationModifications(creationData)).pipe(
            switchMap((claim) => {
                return forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)]);
            }),
            pluck(0)
        );
    }

    private createShopCreationModifications({
        url,
        name,
        category,
        contract,
        payoutToolID,
        bankAccount: { account, bankName, bankPostAccount, bankBik },
    }: RussianShopCreateData): PartyModification[] {
        const contractorID = this.idGenerator.uuid();
        const contractID = this.idGenerator.uuid();
        const shopID = this.idGenerator.uuid();

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
        } = contract.contractor as unknown as RussianLegalEntity & { bankAccount: RussianBankAccount }; // TODO: add valid type for contractor object

        const bankAccount: Omit<RussianBankAccount, 'payoutToolType'> = {
            account,
            bankName,
            bankPostAccount,
            bankBik,
        };

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
                paymentInstitution: { id: contract.paymentInstitutionID },
            }),
        ];
        if (!payoutToolID) {
            payoutToolID = this.idGenerator.uuid();
            result.push(
                createRussianContractPayoutToolCreationModification(contractID, this.idGenerator.uuid(), bankAccount)
            );
        }
        return [
            ...result,
            createShopCreationModification(shopID, {
                category: {
                    categoryID: category?.categoryID ?? 1,
                },
                location: makeShopLocation({ url }),
                details: { name },
                contractID,
                payoutToolID,
            }),
        ];
    }
}
