import { Component } from '@angular/core';

import { ConfigService } from '../../config';
import { PaymentPartType } from './parts';
import { routeEnv } from '../route-env';

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
    testEnvironmentRouterLink = `/payment-section/env/${routeEnv['0']}/operations`;

    constructor(private configService: ConfigService) {}
}
