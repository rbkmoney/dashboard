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
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;
    hasWallets$ = this.walletsService.hasWallets$;
    inverted = this.themeManager.isMainBackgroundImages;
    currentThemeName = this.themeManager.current;

    constructor(
        private configService: ConfigService,
        private walletsService: WalletService,
        private themeManager: ThemeManager
    ) {}
}