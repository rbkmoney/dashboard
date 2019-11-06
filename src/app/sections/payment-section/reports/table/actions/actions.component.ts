import { Component, Input, ViewChild } from '@angular/core';

import { Report } from '../../../../../api-codegen/anapi';
import { DropdownTriggerDirective } from '../../../../../dropdown';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html'
})
export class ActionsComponent {
    @Input() report: Report;
    @ViewChild(DropdownTriggerDirective, { static: false }) trigger: DropdownTriggerDirective;
}
