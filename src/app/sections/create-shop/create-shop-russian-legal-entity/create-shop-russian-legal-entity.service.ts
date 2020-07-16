import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import uuid from 'uuid';

import {
    ClaimsService,
    createDocumentModificationUnit,
    PayoutsService,
    QuestionaryService,
    ShopService,
} from '../../../api';
import {
    BankAccount,
    QuestionaryData,
    RussianBankAccount,
    ShopLocation,
    ShopLocationUrl,
} from '../../../api-codegen/questionary';

@Injectable()
export class CreateShopRussianLegalEntityService {
    constructor(
        private claimsService: ClaimsService,
        private shopService: ShopService,
        private payoutsService: PayoutsService,
        private questionaryService: QuestionaryService
    ) {}

    createShop({
        url,
        name,
        bankName,
        bankBik,
        bankPostAccount,
        account,
    }: {
        url: string;
        name: string;
        bankName: string;
        bankBik: string;
        bankPostAccount: string;
        account: string;
    }) {
        const initialDocumentID = uuid();
        const changeset = [createDocumentModificationUnit(initialDocumentID)];
        const questionaryData: QuestionaryData = {
            shopInfo: {
                location: {
                    locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
                    url,
                } as ShopLocationUrl,
                details: {
                    name,
                },
            },
            bankAccount: {
                bankAccountType: BankAccount.BankAccountTypeEnum.RussianBankAccount,
                account,
                bankName,
                bankPostAccount,
                bankBik,
            } as RussianBankAccount,
        };
        return this.questionaryService.saveQuestionary(initialDocumentID, questionaryData).pipe(
            switchMap(() => forkJoin([of(initialDocumentID), this.claimsService.createClaim(changeset)])),
            switchMap(([, { id, revision }]) => this.claimsService.requestReviewClaimByID(id, revision))
        );
    }

    getPayoutToolByShopID(shopID: string) {
        return this.shopService.shops$.pipe(
            map((shops) => shops.find(({ id }) => id === shopID)),
            switchMap(({ contractID, payoutToolID }) => this.payoutsService.getPayoutToolByID(contractID, payoutToolID))
        );
    }
}
