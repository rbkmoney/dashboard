import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { filterBattleShops, filterTestShops, ShopService } from '../../../../api/shop';
import { booleanDelay } from '../../../../custom-operators';
import { PaymentPartType } from './payment-part-type';
import { ContentConfig } from './content-config';

@Injectable()
export class PaymentsService {
    hasTestEnvironment$ = this.shopService.shops$.pipe(
        filterTestShops,
        map(negate(isEmpty))
    );

    hasRealEnvironment$ = this.shopService.shops$.pipe(
        filterBattleShops,
        map(negate(isEmpty))
    );

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
