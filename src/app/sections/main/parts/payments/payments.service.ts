import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { ShopService, filterTestShops, filterBattleShops } from '../../../../api/shop';
import { booleanDelay } from '../../../../custom-operators/boolean-delay';
import { PaymentPartType } from './payment-part-type';
import { ContentConfig } from './content-config';
import { LocaleDictionaryService } from '../../../../locale';

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

    constructor(private shopService: ShopService, private lcService: LocaleDictionaryService) {}

    toContentConfig(type: PaymentPartType, basePath = 'sections.main.payments'): ContentConfig {
        const mapDict = path => this.lcService.mapDictionaryKey(`${basePath}.${path}`);
        const mapSubheading = path => mapDict(`subheading.${path}`);
        const mapAction = path => mapDict(`action.${path}`);
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
