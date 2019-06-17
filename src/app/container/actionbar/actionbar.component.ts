import { Component, ViewChild } from '@angular/core';
import { KeycloakService } from '../../auth';

import { DropdownTriggerDirective } from '../../dropdown';
import { ThemeService } from '../../theme';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html',
    styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective) trigger: DropdownTriggerDirective;

    constructor(private themeService: ThemeService, private keycloakService: KeycloakService) {}

    async logout() {
        await this.keycloakService.logout();
    }

    changeTheme() {
        this.themeService.changeTheme();
    }
}
