import { Component } from '@angular/core';

import { KeycloakService } from '../../../auth';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    constructor(private keycloakService: KeycloakService) {}

    async logout() {
        await this.keycloakService.logout();
    }
}
