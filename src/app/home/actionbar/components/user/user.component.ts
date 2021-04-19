import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { KeycloakService } from '../../../../auth';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    @Output() selected = new EventEmitter<void>();

    constructor(private keycloakService: KeycloakService) {}

    async logout() {
        await this.keycloakService.logout();
    }
}
