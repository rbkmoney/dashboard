import { Component, ViewChild } from '@angular/core';

import { DropdownTriggerDirective } from '../dropdown/dropdown-trigger.directive';
import { ThemeService } from '../theme';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html',
    styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective) trigger: DropdownTriggerDirective;

    constructor(private themeService: ThemeService) {}

    close() {
        this.trigger.close();
    }

    changeTheme() {
        this.themeService.changeTheme();
    }
}
