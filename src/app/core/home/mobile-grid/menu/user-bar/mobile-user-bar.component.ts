import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'dsh-mobile-user-bar',
    templateUrl: './mobile-user-bar.component.html',
    styleUrls: ['./mobile-user-bar.component.scss'],
})
export class MobileUserBarComponent {
    userName = 'user.name';

    constructor(private keycloakService: KeycloakService) {}

    logout(): void {
        // console.log('Log out, ', this.userName);
        this.keycloakService.logout();
    }
}
