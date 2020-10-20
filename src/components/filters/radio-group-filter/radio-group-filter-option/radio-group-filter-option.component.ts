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
    selector: 'dsh-radio-group-filter-option',
    templateUrl: 'radio-group-filter-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupFilterOptionComponent<T = any> {
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

    selected$ = new BehaviorSubject(false);
    displayed$ = new BehaviorSubject(true);

    display(isDisplay: boolean) {
        this.displayed$.next(isDisplay);
        this.styleDisplay = isDisplay ? 'block' : 'none';
    }

    select(isSelected: boolean) {
        this.selected$.next(isSelected);
    }
}
