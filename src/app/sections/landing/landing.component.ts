import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WalletService } from '@dsh/api/wallet';

import { ConfigService } from '../../config';
import { ThemeManager } from '../../theme-manager';

@Component({
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
    hasWallets$ = this.walletsService.hasWallets$;
    inverted = this.themeManager.isMainBackgroundImages;
    currentThemeName = this.themeManager.current;

    docsEndpoints = this.configService.docsEndpoints;
    manualLink = `${this.docsEndpoints.help}/lk/lk`;
    orgLink = `${this.docsEndpoints.help}/lk/access_rights`;
    integrationLink = this.docsEndpoints.developer;
    pluginsLink = `${this.docsEndpoints.rbk}/plagin-oplaty`;

    constructor(
        private configService: ConfigService,
        private walletsService: WalletService,
        private themeManager: ThemeManager
    ) {}
}
