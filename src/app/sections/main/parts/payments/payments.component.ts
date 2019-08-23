import { Component, OnInit, Input } from '@angular/core';

import { LocaleDictionaryService } from '../../../../locale';
import { PaymentsService } from './payments.service';
import { SpinnerType } from '../../../../spinner';

export enum PaymentPartType {
    prestine = 'prestine',
    onboardingPending = 'pending',
    onboardingReview = 'review',
    onboardingReviewed = 'reviewed',
    accepted = 'accepted'
}

interface ContentConfig {
    subheading: string;
    action: string;
}

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss'],
    providers: [PaymentsService]
})
export class PaymentsComponent implements OnInit {
    @Input() type: PaymentPartType = PaymentPartType.prestine;
    @Input() actionRouterLink = '/';
    @Input() testEnvironmentRouterLink = '/';

    config: ContentConfig;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(private lcService: LocaleDictionaryService, public paymentsService: PaymentsService) {}

    ngOnInit() {
        this.config = this.toConfig(this.type);
    }

    private toConfig(type: PaymentPartType, basePath = 'sections.main.payments'): ContentConfig {
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
