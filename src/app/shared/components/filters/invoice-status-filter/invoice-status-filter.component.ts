import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-invoice-status-filter',
    templateUrl: 'invoice-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceStatusFilterComponent {
    @Input() selected?: Invoice.StatusEnum;
    @Output() selectedChange = new EventEmitter<Invoice.StatusEnum>();
    statuses = Object.values(Invoice.StatusEnum);
}
