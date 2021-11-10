import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ContextService } from '@dsh/app/shared/services/context';

import { KeycloakService } from '../../../../auth';
import { ConfigService } from '../../../../config';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    @Output() selected = new EventEmitter<void>();

    activeOrg$ = this.contextService.organization$;
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

    constructor(
        private keycloakService: KeycloakService,
        private config: ConfigService,
        private contextService: ContextService,
        private router: Router,
        private dialog: MatDialog
    ) {}

    openBlank(href: string): void {
        window.open(href, '_blank');
    }

    async logout(): Promise<void> {
        await this.keycloakService.logout();
    }

    selectActiveOrg(): void {}

    openOrgList(): void {
        void this.router.navigate(['organization-section', 'organizations']);
        this.selected.emit();
    }
}
