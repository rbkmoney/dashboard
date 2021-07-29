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

    constructor(private keycloakService: KeycloakService, private config: ConfigService) {}

    navigateToChangePassword(): void {
        window.open(this.config.keycloak.resetPassword, '_blank');
    }

    navigateToSessions(): void {
        window.open(this.config.keycloak.sessions, '_blank');
    }

    navigateTo2FA(): void {
        window.open(this.config.keycloak.twoFactorAuth, '_blank');
    }

    async logout() {
        await this.keycloakService.logout();
    }
}
