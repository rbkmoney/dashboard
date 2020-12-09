import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { pluck, switchMap, switchMapTo } from 'rxjs/operators';
import uuid from 'uuid';

import {
    BankAccount,
    InternationalBankAccount,
    InternationalLegalEntity,
    LegalEntity,
    LegalEntityContractor,
    QuestionaryData,
    ShopLocation,
    ShopLocationUrl,
} from '@dsh/api-codegen/questionary';
import { ClaimsService, createDocumentModificationUnit } from '@dsh/api/claims';
import { QuestionaryService } from '@dsh/api/questionary';
import { CountryCodes } from '../../types/country-codes';
import { FormValue } from '../../types/form-value';

@Injectable()
export class CreateInternationalShopEntityService {
    constructor(private claimsService: ClaimsService, private questionaryService: QuestionaryService) {}

    createShop({
        shopUrl,
        shopName,
        organizationName,
        tradingName,
        registeredAddress,
        actualAddress,
        payoutTool,
        correspondentPayoutTool,
    }: FormValue) {
        const initialDocumentID = uuid();
        const changeset = [createDocumentModificationUnit(initialDocumentID)];
        const questionaryData: QuestionaryData = {
            shopInfo: {
                location: {
                    locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    url: shopUrl,
                } as ShopLocationUrl,
                details: {
                    name: shopName,
                },
            },
            bankAccount: {
                bankAccountType: BankAccount.BankAccountTypeEnum.InternationalBankAccount,
                iban: payoutTool.iban,
                number: payoutTool.number,
                bank: {
                    abaRtn: payoutTool.abaRtn,
                    address: payoutTool.address,
                    bic: payoutTool.bic,
                    name: payoutTool.name,
                    country: this.getCountryCode(payoutTool.country),
                },
                correspondentAccount: !correspondentPayoutTool
                    ? null
                    : {
                          iban: correspondentPayoutTool.iban,
                          number: correspondentPayoutTool.number,
                          bank: {
                              abaRtn: correspondentPayoutTool.abaRtn,
                              address: correspondentPayoutTool.address,
                              bic: correspondentPayoutTool.bic,
                              name: correspondentPayoutTool.name,
                              country: this.getCountryCode(correspondentPayoutTool.country),
                          },
                      },
            } as InternationalBankAccount,
            contractor: {
                contractorType: 'LegalEntityContractor',
                legalEntity: {
                    legalEntityType: LegalEntity.LegalEntityTypeEnum.InternationalLegalEntity,
                    legalName: organizationName,
                    tradingName,
                    registeredAddress,
                    actualAddress,
                } as InternationalLegalEntity,
            } as LegalEntityContractor,
        };
        return this.questionaryService.saveQuestionary(initialDocumentID, questionaryData).pipe(
            switchMapTo(this.claimsService.createClaim(changeset)),
            switchMap((claim) =>
                forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)])
            ),
            pluck(0)
        );
    }

    getCountryCode(country: string): number {
        return CountryCodes[country];
    }
}
