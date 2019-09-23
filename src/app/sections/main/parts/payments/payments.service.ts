import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopService, ClaimsService } from '../../../../api';
import { ClaimStatus } from '../../../../api/claims/claims.service';
import { toContentConf } from './to-content-conf';
import { LocaleDictionaryService } from '../../../../locale';
import { ActionBtnContent, TestEnvBtnContent } from './content-config';
import { booleanDelay, takeError } from '../../../../custom-operators';
import { filterBattleShops, filterTestShops, ShopService } from '../../../../api/shop';
import { booleanDelay } from '../../../../custom-operators';
import { PaymentPartType } from './payment-part-type';
import { ContentConfig } from './content-config';

@Injectable()
export class PaymentsService {
    subheading$: Observable<string>;
    actionBtnContent$: Observable<ActionBtnContent>;
    testEnvBtnContent$: Observable<TestEnvBtnContent>;
    isLoading$: Observable<boolean>;

    constructor(
        private shopService: ShopService,
        private claimService: ClaimsService,
        private snackBar: MatSnackBar,
        private dicService: LocaleDictionaryService
    ) {
        const claims = this.claimService.search1000Claims([
            ClaimStatus.Pending,
            ClaimStatus.PendingAcceptance,
            ClaimStatus.Review
        ]);
        const contentConfig = toContentConf(this.shopService.shops$, claims);
        this.actionBtnContent$ = contentConfig.pipe(map(c => c.actionBtnContent));
        this.testEnvBtnContent$ = contentConfig.pipe(map(c => c.testEnvBtnContent));
        this.subheading$ = contentConfig.pipe(map(c => c.subheading));
        this.isLoading$ = combineLatest(this.shopService.shops$, claims).pipe(booleanDelay());
        combineLatest(this.isLoading$, contentConfig)
            .pipe(takeError)
            .subscribe(() => this.snackBar.open(this.dicService.mapDictionaryKey('common.commonError'), 'OK'));
    isLoading$ = this.shopService.shops$.pipe(booleanDelay());

    constructor(private shopService: ShopService) {}

    toContentConfig(type: PaymentPartType, t: any): ContentConfig {
        const mapSubheading = path => t.payments.subheading[path];
        const mapAction = path => t.payments.action[path];
        const toContentConf = (subheading, action) => ({
            subheading: mapSubheading(subheading),
            action: mapAction(action)
        });
        switch (type) {
            case PaymentPartType.prestine:
                return toContentConf('prestine', 'join');
            case PaymentPartType.onboardingPending:
                return toContentConf('onboardingPending', 'continue');
            case PaymentPartType.onboardingReview:
                return toContentConf('onboardingReview', 'claimDetails');
            case PaymentPartType.onboardingReviewed:
                return toContentConf('onboardingReviewed', 'claimDetails');
            case PaymentPartType.accepted:
                return toContentConf('prestine', 'details');
        }
    }
}
