import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Report } from '../../../../api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-reports-list',
    templateUrl: 'reports-list.component.html',
})
export class ReportsListComponent {
    @Input() reports: Report[];
    @Input() expandedId: number;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
}
