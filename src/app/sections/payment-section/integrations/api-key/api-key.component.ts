import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';

import { ConfigService } from '../../../../config';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    templateUrl: 'api-key.component.html'
})
export class ApiKeyComponent {
    token$ = from(this.keycloakService.getToken());
    paymentsApiSpecEndpoint = this.configService.ext.paymentsApiSpecEndpoint;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private keycloakService: KeycloakService,
        private configService: ConfigService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
