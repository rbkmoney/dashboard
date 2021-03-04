import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { DropdownTriggerDirective } from '@dsh/components/layout';

import { ThemeManager, ThemeName } from '../../theme-manager';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: 'actionbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective, { static: true }) trigger: DropdownTriggerDirective;

    constructor(private themeService: ThemeManager) {}

    changeTheme() {
        const themes: ThemeName[] = Object.values(ThemeName);
        const nextThemeIdx = (themes.findIndex((name) => name === this.themeService.current) + 1) % themes.length;
        this.themeService.change(themes[nextThemeIdx]);
    }

    closeDropdown() {
        this.trigger.close();
    }
}
