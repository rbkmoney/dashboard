import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KeycloakService } from '../../../../auth';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    constructor(private keycloakService: KeycloakService) {}

    async logout() {
        await this.keycloakService.logout();
    }
}
