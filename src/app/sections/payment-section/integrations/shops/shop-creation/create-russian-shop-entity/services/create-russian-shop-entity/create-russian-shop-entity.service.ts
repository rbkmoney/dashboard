import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { forkJoin, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import uuid from 'uuid';

import { ClaimsService } from '@dsh/api/claims';
import { ClaimContractModificationService } from '@dsh/api/claims/claim-party-modification/claim-contract-modification/claim-contract-modification.service';
import { ClaimContractorModificationService } from '@dsh/api/claims/claim-party-modification/claim-contractor-modification/claim-contractor-modification.service';
import { ClaimShopModificationService } from '@dsh/api/claims/claim-party-modification/claim-shop-modification/claim-shop-modification.service';

import { Claim, PartyModification, RussianLegalEntity } from '../../../../../../../../api-codegen/claim-management';
import { RussianShopCreateData } from '../../types/russian-shop-create-data';

@UntilDestroy()
@Injectable()
export class CreateRussianShopEntityService {
    constructor(
        private claimsService: ClaimsService,
        private contractorModificationService: ClaimContractorModificationService,
        private shopModificationService: ClaimShopModificationService,
        private contractModificationService: ClaimContractModificationService
    ) {}

    createShop(creationData: RussianShopCreateData) {
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
        const contractorID = uuid();
        const contractID = uuid();
        const shopID = uuid();

        let payoutToolID = uuid();
        const payoutChangeset: PartyModification[] = [];

        if (isNil(shopPayoutToolID)) {
            payoutChangeset.push(
                this.contractModificationService.createRussianContractPayoutToolModification(contractID, payoutToolID, {
                    account,
                    bankName,
                    bankPostAccount,
                    bankBik,
                })
            );
        } else {
            payoutToolID = shopPayoutToolID;
        }

        return [
            this.contractorModificationService.createRussianLegalEntityModification(contractorID, {
                ...((contract.contractor as any) as RussianLegalEntity),
            }),
            this.contractModificationService.createContractorParamsModification(contractID, {
                contractorID,
            }),
            ...payoutChangeset,
            this.shopModificationService.createShopCreationModification(shopID, {
                location: this.shopModificationService.makeShopLocation({ url }),
                details: this.shopModificationService.makeShopDetails({ name }),
                contractID,
                payoutToolID,
            }),
        ];
    }
}
