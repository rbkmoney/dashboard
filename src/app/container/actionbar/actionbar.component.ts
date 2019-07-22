import { Component, ViewChild } from '@angular/core';

import { DropdownTriggerDirective } from '../../dropdown';
import { ThemeManager } from '../../theme-manager';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html'
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective, { static: true }) trigger: DropdownTriggerDirective;

    constructor(private themeService: ThemeManager) {}

    changeTheme() {
        this.themeService.changeTheme();
    }

    actionHandler({ isMoving }) {
        if (isMoving) {
            this.trigger.close();
        }
    }
}
