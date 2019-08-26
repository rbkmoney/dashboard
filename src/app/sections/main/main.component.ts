import { Component } from '@angular/core';

import { ConfigService } from '../../config';
import { PaymentPartType } from './parts';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;
    hasWallets = false;
    paymentsSectionType = PaymentPartType.prestine;
    paymentsSectionActionRouterLink = '/onboarding';
    testEnvironmentRouterLink = '/payment-section/operations';

    constructor(private configService: ConfigService) {}
}
