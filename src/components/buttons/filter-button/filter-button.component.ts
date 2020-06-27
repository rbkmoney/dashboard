import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { DropdownComponent } from '../../layout/dropdown';

@Component({
    selector: 'dsh-filter-button',
    templateUrl: 'filter-button.component.html',
    styleUrls: ['filter-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonComponent {
    @Input() title: string;
    @Input() count: number;

    @Output() closed = new EventEmitter<void>();

    @ViewChild(DropdownComponent) dropdown: DropdownComponent;

    active = false;

    close() {
        this.dropdown.close();
    }
}
