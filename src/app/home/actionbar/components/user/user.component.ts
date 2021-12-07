import { ChangeDetectionStrategy, Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Organization } from '@dsh/api-codegen/organizations';
import { DIALOG_CONFIG, DialogConfig } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ContextService } from '@dsh/app/shared/services/context';

import { KeycloakService } from '../../../../auth';
import { ConfigService } from '../../../../config';
import { SelectActiveOrganizationDialogComponent } from '../select-active-organization-dialog/select-active-organization-dialog.component';

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
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    openBlank(href: string): void {
        window.open(href, '_blank');
    }

    async logout(): Promise<void> {
        await this.keycloakService.logout();
    }

    selectActiveOrg(): void {
        this.selected.emit();
        this.dialog
            .open<SelectActiveOrganizationDialogComponent, void, BaseDialogResponseStatus | Organization>(
                SelectActiveOrganizationDialogComponent,
                this.dialogConfig.medium
            )
            .afterClosed()
            .pipe(filter((res) => !Object.values(BaseDialogResponseStatus).includes(res as BaseDialogResponseStatus)))
            .subscribe((org: Organization) => {
                this.contextService.switchOrganization(org.id);
            });
    }

    openOrgList(): void {
        void this.router.navigate(['organization-section', 'organizations']);
        this.selected.emit();
    }
}
