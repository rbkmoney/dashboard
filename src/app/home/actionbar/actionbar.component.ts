import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { DropdownTriggerDirective } from '@dsh/components/layout';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: 'actionbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective, { static: true }) trigger: DropdownTriggerDirective;

    closeDropdown(): void {
        this.trigger.close();
    }
}
