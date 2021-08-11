import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';

import { ConfigService } from '../../../../config';

@Component({
    templateUrl: 'api-key.component.html',
    styleUrls: ['api-key.component.scss'],
})
export class ApiKeyComponent {
    token$ = from(this.keycloakService.getToken());
    paymentsApiSpecEndpoint = `${this.configService.docsEndpoints.developer}/api`;

    constructor(
        private keycloakService: KeycloakService,
        private configService: ConfigService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean): void {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
