import { Component, ViewChild } from '@angular/core';

import { DropdownTriggerDirective } from '../../dropdown';
import { ThemeManager, ThemeName } from '../../theme-manager';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html'
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective, { static: true }) trigger: DropdownTriggerDirective;

    constructor(private themeService: ThemeManager) {}

    changeTheme() {
        const themes: string[] = Object.values(ThemeName);
        const nextThemeIdx = (themes.findIndex(name => name === this.themeService.current) + 1) % themes.length;
        this.themeService.change(themes[nextThemeIdx] as any);
    }

    closeDropdown() {
        this.trigger.close();
    }
}
