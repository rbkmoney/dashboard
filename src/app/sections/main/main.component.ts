import { Component } from '@angular/core';

import { ConfigService } from '../../config';
import { ClaimStatus } from './widgets/payments/payments.component';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;

    statuses = ClaimStatus;

    constructor(private configService: ConfigService) {}
}
