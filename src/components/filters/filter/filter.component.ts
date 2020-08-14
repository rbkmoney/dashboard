import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core';

import { DropdownComponent } from '@dsh/components/layout/dropdown';

import { ComponentChanges } from '../../../type-utils';
import { coerceBoolean } from '../../../utils';

@Component({
    selector: 'dsh-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
    @Input() title: string;
    @Input() @coerceBoolean active = false;
    @Input() @coerceBoolean disabled = false;

    @Output() closed = new EventEmitter<void>();

    @ViewChild(DropdownComponent) dropdown: DropdownComponent;

    close() {
        this.dropdown.close();
    }

    constructor(private ref: ChangeDetectorRef) {}

    ngOnChanges({ title }: ComponentChanges<FilterComponent>) {
        if (title) {
            // TODO: hack for always update title
            this.ref.markForCheck();
        }
    }
}
