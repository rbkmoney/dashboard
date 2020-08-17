import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { DropdownComponent } from '@dsh/components/layout/dropdown';

import { coerceBoolean } from '../../../utils';

@Component({
    selector: 'dsh-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss'],
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
