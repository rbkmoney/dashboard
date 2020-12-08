import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, pluck, switchMap, switchMapTo } from 'rxjs/operators';
import uuid from 'uuid';

import {
    BankAccount,
    QuestionaryData,
    RussianBankAccount,
    ShopLocation,
    ShopLocationUrl,
} from '@dsh/api-codegen/questionary';
import { ClaimsService, createDocumentModificationUnit } from '@dsh/api/claims';
import { PayoutsService } from '@dsh/api/payouts';
import { QuestionaryService } from '@dsh/api/questionary';
import { ApiShopsService } from '@dsh/api/shop';

@Injectable()
export class CreateShopRussianLegalEntityService {
    constructor(
        private claimsService: ClaimsService,
        private shopService: ApiShopsService,
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
            switchMapTo(this.claimsService.createClaim(changeset)),
            switchMap((claim) =>
                forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)])
            ),
            pluck(0)
        );
    }

    getPayoutToolByShopID(shopID: string) {
        return this.shopService.shops$.pipe(
            map((shops) => shops.find(({ id }) => id === shopID)),
            switchMap(({ contractID, payoutToolID }) => this.payoutsService.getPayoutToolByID(contractID, payoutToolID))
        );
    }
}
