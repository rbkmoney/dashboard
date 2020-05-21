import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DropdownTriggerDirective } from '@dsh/components/layout';

import { Report } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html',
})
export class ActionsComponent {
    @Input() report: Report;
    @ViewChild(DropdownTriggerDirective) trigger: DropdownTriggerDirective;

    constructor(private router: Router) {}

    goToReportDetails(reportID: number) {
        this.router.navigate(['report', reportID]);
    }
}
