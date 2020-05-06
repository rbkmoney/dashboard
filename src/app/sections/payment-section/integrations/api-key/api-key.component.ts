import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { KeycloakService } from 'keycloak-angular';
import { fromPromise } from 'rxjs/internal-compatibility';

import { ConfigService } from '../../../../config';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    templateUrl: 'api-key.component.html',
    styleUrls: ['api-key.component.scss']
})
export class ApiKeyComponent {
    token$ = fromPromise(this.keycloakService.getToken());
    paymentsEndpoint = this.configService.ext.paymentsEndpoint;

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
