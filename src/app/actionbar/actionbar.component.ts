import { Component, ViewChild } from '@angular/core';

import { DropdownTriggerDirective } from '../dropdown/dropdown-trigger.directive';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html',
    styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective) trigger: DropdownTriggerDirective;

    close() {
        this.trigger.close();
    }
}
