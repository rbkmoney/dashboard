import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    ViewChild,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dsh-multiselect-filter-option',
    templateUrl: 'multiselect-filter-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterOptionComponent<T = any> {
    @Input() value: T;

    toggle = new EventEmitter<void>();

    @HostBinding('style.display') styleDisplay = 'block';

    @ViewChild(MatCheckbox, { read: ElementRef }) private content: ElementRef;

    get label() {
        return (this.content?.nativeElement?.textContent || '').trim();
    }

    get selected() {
        return this.selected$.value;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    selected$ = new BehaviorSubject(false);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    displayed$ = new BehaviorSubject(true);

    display(isDisplay: boolean) {
        this.displayed$.next(isDisplay);
        this.styleDisplay = isDisplay ? 'block' : 'none';
    }

    select(isSelected: boolean) {
        this.selected$.next(isSelected);
    }
}
