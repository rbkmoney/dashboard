import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import isNil from 'lodash-es/isNil';
import { forkJoin, Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Claim, Modification } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import {
    createContractCreationModification,
    createInternationalLegalEntityModification,
    createShopCreationModification,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';
import { createInternationalContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification/claim-contract-modification/create-international-contract-payout-tool-modification';

import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

@Injectable()
export class CreateInternationalShopEntityService {
    constructor(private claimsService: ClaimsService, private idGenerator: IdGeneratorService) {}

    createShop(creationData: InternationalShopEntityFormValue): Observable<Claim> {
        return this.claimsService.createClaim(this.createClaimsModifications(creationData)).pipe(
            switchMap((claim) =>
                forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)])
            ),
            pluck(0)
        );
    }

    private createClaimsModifications({
        shopUrl: url,
        shopName: name,
        organizationName: legalName,
        tradingName,
        registeredAddress,
        actualAddress,
        country,
        payoutTool,
        correspondentPayoutTool = null,
    }: InternationalShopEntityFormValue): Modification[] {
        const contractorID = this.idGenerator.uuid();
        const contractID = this.idGenerator.uuid();
        const payoutToolID = this.idGenerator.uuid();
        const shopID = this.idGenerator.uuid();

        return [
            createInternationalLegalEntityModification(contractorID, {
                legalName,
                registeredNumber: '', // add ui field or remove it
                registeredAddress,
                tradingName,
                actualAddress,
                country,
            }),
            createContractCreationModification(contractID, {
                contractorID,
            }),
            createInternationalContractPayoutToolModification(contractID, payoutToolID, {
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
            }),
            createShopCreationModification(shopID, {
                category: {
                    categoryID: 1,
                },
                location: makeShopLocation({
                    url,
                }),
                details: {
                    name,
                },
                payoutToolID,
                contractID,
            }),
        ];
    }
}
