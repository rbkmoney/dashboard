import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: 'invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesFilterComponent {
    @Input() selected?: string[];
    @Output() selectedChange = new EventEmitter<string[]>();
}
