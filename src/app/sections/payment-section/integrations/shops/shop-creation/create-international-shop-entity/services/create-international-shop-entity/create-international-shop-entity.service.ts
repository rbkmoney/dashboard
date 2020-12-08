import { Injectable } from '@angular/core';
import isNil from 'lodash.isnil';
import { forkJoin, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import {
    createContractorParamsModification,
    createInternationalLegalEntityModification,
    createShopCreationModification,
    makeShopDetails,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';
import { createInternationalContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification/claim-contract-modification/create-international-contract-payout-tool-modification';
import { UuidGeneratorService } from '@dsh/app/shared/services/uuid-generator/uuid-generator.service';

import { Modification } from '../../../../../../../../api-codegen/claim-management';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

@Injectable()
export class CreateInternationalShopEntityService {
    constructor(private claimsService: ClaimsService, private uuidGenerator: UuidGeneratorService) {}

    createShop(creationData: InternationalShopEntityFormValue) {
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
        payoutTool,
        correspondentPayoutTool = null,
    }: InternationalShopEntityFormValue): Modification[] {
        const contractorID = this.uuidGenerator.generateUUID();
        const contractID = this.uuidGenerator.generateUUID();
        const payoutToolID = this.uuidGenerator.generateUUID();
        const shopID = this.uuidGenerator.generateUUID();

        return [
            createInternationalLegalEntityModification(contractorID, {
                legalName,
                registeredNumber: '', // add ui field or remove it
                registeredAddress,
                tradingName,
                actualAddress,
            }),
            createContractorParamsModification(contractID, {
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
                location: makeShopLocation({
                    url,
                }),
                details: makeShopDetails({
                    name,
                }),
                payoutToolID,
                contractID,
            }),
        ];
    }
}
