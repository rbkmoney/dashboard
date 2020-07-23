import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { coerceBoolean } from '../../utils';
import { DropdownComponent } from '../layout/dropdown';

@Component({
    selector: 'dsh-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
    @Input() title: string;
    @Input() @coerceBoolean active = false;
    @Input() @coerceBoolean disabled = false;

    @Output() closed = new EventEmitter<void>();

    @ViewChild(DropdownComponent) dropdown: DropdownComponent;

    close() {
        this.dropdown.close();
    }
}
