import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '../../api/wallet';
import { ConfigService } from '../../config';
import { SHARE_REPLAY_CONF } from '../../custom-operators';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;
    oldDashboardEndpoint = this.configService.ext.oldDashboardEndpoint;
    hasWallets$ = this.walletsService.listWallets(1).pipe(
        map(w => w.result.length > 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private configService: ConfigService, private walletsService: WalletService) {}
}
