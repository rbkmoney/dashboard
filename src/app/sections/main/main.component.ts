import { Component } from '@angular/core';

import { WalletService } from '../../api/wallet';
import { ConfigService } from '../../config';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
})
export class MainComponent {
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;
    oldDashboardEndpoint = this.configService.ext.oldDashboardEndpoint;
    hasWallets$ = this.walletsService.hasWallets$;

    constructor(private configService: ConfigService, private walletsService: WalletService) {}
}
