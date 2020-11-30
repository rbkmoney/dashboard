import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { filter, map, pluck, switchMap, switchMapTo } from 'rxjs/operators';
import uuid from 'uuid';

import {
    ClaimsService,
    createDocumentModificationUnit,
    PayoutsService,
    QuestionaryService,
} from '../../../../../../../../api';
import { Shop } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import {
    BankAccount,
    QuestionaryData,
    RussianBankAccount,
    ShopLocation,
    ShopLocationUrl,
} from '../../../../../../../../api-codegen/questionary';
import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';

@Injectable()
export class CreateRussianShopEntityService {
    constructor(
        private claimsService: ClaimsService,
        private shopService: FetchShopsService,
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
        return this.shopService.allShops$.pipe(
            map((shops: Shop[]) => shops.find(({ id }: Shop) => id === shopID)),
            filter(Boolean),
            switchMap(({ contractID, payoutToolID }) => this.payoutsService.getPayoutToolByID(contractID, payoutToolID))
        );
    }
}
