import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    ViewChild,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';

import { ComponentChanges } from '../../../../type-utils';
import { coerceBoolean } from '../../../../utils';

@Component({
    selector: 'dsh-multiselect-filter-option',
    templateUrl: 'multiselect-filter-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterOptionComponent<T = any> implements OnChanges {
    @Input() value: T;
    @Input() @coerceBoolean selected = false;

    @HostBinding('style.display') styleDisplay = 'block';

    @ViewChild(MatCheckbox, { read: ElementRef }) private content: ElementRef;

    get label() {
        return (this.content?.nativeElement?.textContent || '').trim();
    }

    selected$ = new BehaviorSubject(false);
    displayed$ = new BehaviorSubject(true);

    toggle() {
        this.selected$.next(!this.selected$.value);
    }

    ngOnChanges({ selected }: ComponentChanges<MultiselectFilterOptionComponent<T>>) {
        if (selected) {
            this.selected$.next(selected.currentValue);
        }
    }

    display(isDisplay = true) {
        this.displayed$.next(isDisplay);
        this.styleDisplay = isDisplay ? 'block' : 'none';
    }

    select(isSelected = true) {
        this.selected$.next(isSelected);
    }
}
