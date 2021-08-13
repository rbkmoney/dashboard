import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { KeycloakService } from '../../../../auth';
import { ConfigService } from '../../../../config';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    @Output() selected = new EventEmitter<void>();

    username = this.keycloakService.getUsername();
    keycloakAccountEndpoint = `${this.config.keycloakEndpoint}/auth/realms/external/account/`;
    userLinksConfig = [
        {
            translocoPath: 'user.changePassword',
            href: `${this.keycloakAccountEndpoint}/password`,
        },
        {
            translocoPath: 'user.sessions',
            href: `${this.keycloakAccountEndpoint}/sessions`,
        },
        {
            translocoPath: 'user.twoFactorAuth',
            href: `${this.keycloakAccountEndpoint}/totp`,
        },
    ];

    constructor(private keycloakService: KeycloakService, private config: ConfigService) {}

    openBlank(href: string): void {
        window.open(href, '_blank');
    }

    async logout(): Promise<void> {
        await this.keycloakService.logout();
    }
}
