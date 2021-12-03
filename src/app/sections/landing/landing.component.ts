import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { WalletService } from '@dsh/api/wallet';

import { ConfigService } from '../../config';
import { IntegrationService, IntegrationsEnum } from '../../integration';
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
        private themeManager: ThemeManager,
        private integrationService: IntegrationService,
        private router: Router
    ) {
        if (this.integrationService.integration !== IntegrationsEnum.Rbkmoney) {
            void this.router.navigateByUrl('payment-section');
        }
    }
}
