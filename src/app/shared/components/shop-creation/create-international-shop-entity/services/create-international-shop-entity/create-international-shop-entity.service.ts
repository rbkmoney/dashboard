import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

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
        return this.claimsService
            .createClaim(this.createClaimsModifications(creationData))
            .pipe(
                switchMap((claim) =>
                    this.claimsService.requestReviewClaimByID(claim.id, claim.revision).pipe(mapTo(claim))
                )
            );
    }

    private createClaimsModifications({
        shopDetails,
        orgDetails: { created: newContractor, existing: contract },
        paymentInstitution,
        bankAccount: { created: newBankAccount, existing: payoutTool },
    }: InternationalShopEntityFormValue): Modification[] {
        const contractorID = this.idGenerator.uuid();
        const contractID = this.idGenerator.uuid();
        const payoutToolID = this.idGenerator.uuid();
        const shopID = this.idGenerator.uuid();
        const contractor = contract?.contractor;

        const result: Modification[] = [
            createInternationalLegalEntityModification(
                contractorID,
                newContractor
                    ? {
                          legalName: newContractor.organizationName,
                          registeredNumber: '',
                          registeredAddress: newContractor.registeredAddress,
                          tradingName: newContractor.tradingName,
                          actualAddress: newContractor.actualAddress,
                          country: newContractor.country,
                      }
                    : {
                          legalName: contractor.legalName,
                          registeredNumber: contractor.registeredNumber,
                          registeredAddress: contractor.registeredOffice,
                          tradingName: contractor.tradingName,
                          actualAddress: contractor.principalPlaceOfBusiness,
                          country: contractor.country,
                      }
            ),
            createContractCreationModification(contractID, {
                contractorID,
                paymentInstitution: { id: paymentInstitution?.id ?? 1 },
            }),
        ];
        if (newBankAccount) {
            const { payoutTool, correspondentPayoutTool } = newBankAccount;
            result.push(
                createInternationalContractPayoutToolModification(contractID, payoutToolID, payoutTool.currency, {
                    iban: payoutTool.iban,
                    number: payoutTool.number,
                    bank: {
                        abaRtn: payoutTool.abaRtn,
                        address: payoutTool.address,
                        bic: payoutTool.bic,
                        name: payoutTool.name,
                        country: payoutTool.country,
                    },
                    correspondentAccount: correspondentPayoutTool
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
                })
            );
        } else {
            const payoutToolDetails = payoutTool.details;
            const { bankDetails, correspondentBankAccount } = payoutToolDetails;
            const { bankDetails: correspondentBankDetails } = correspondentBankAccount;
            result.push(
                createInternationalContractPayoutToolModification(contractID, payoutToolID, payoutTool.currency, {
                    iban: payoutToolDetails.iban,
                    number: payoutToolDetails.number,
                    bank: {
                        abaRtn: bankDetails.abartn,
                        address: bankDetails.address,
                        bic: bankDetails.bic,
                        name: bankDetails.name,
                        country: bankDetails.countryCode,
                    },
                    correspondentAccount: correspondentBankDetails
                        ? null
                        : {
                              accountHolder: '', // add ui field or remove it
                              iban: correspondentBankAccount.iban,
                              number: correspondentBankAccount.number,
                              bank: {
                                  abaRtn: correspondentBankDetails.abartn,
                                  address: correspondentBankDetails.address,
                                  bic: correspondentBankDetails.bic,
                                  name: correspondentBankDetails.name,
                                  country: correspondentBankDetails.countryCode,
                              },
                          },
                })
            );
        }
        result.push(
            createShopCreationModification(shopID, {
                category: {
                    categoryID: shopDetails.category?.categoryID ?? 1,
                },
                location: makeShopLocation({
                    url: shopDetails.url,
                }),
                details: {
                    name: shopDetails.name,
                },
                payoutToolID,
                contractID,
            })
        );
        return result;
    }
}
