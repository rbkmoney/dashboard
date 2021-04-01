import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';

import { KeycloakService } from '../../../auth';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    orgs$ = this.organizationsService.listOrgMembership(5).pipe(shareReplay(1));

    constructor(private keycloakService: KeycloakService, private organizationsService: OrganizationsService) {}

    async logout() {
        await this.keycloakService.logout();
    }
}
