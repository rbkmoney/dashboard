import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WalletService } from '@dsh/api/wallet';

import { ConfigService } from '../../config';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;
    hasWallets$ = this.walletsService.hasWallets$;

    constructor(private configService: ConfigService, private walletsService: WalletService) {}
}
