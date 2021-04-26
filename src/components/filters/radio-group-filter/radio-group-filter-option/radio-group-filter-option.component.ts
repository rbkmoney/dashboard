import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dsh-radio-group-filter-option',
    templateUrl: 'radio-group-filter-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupFilterOptionComponent<T = any> {
    @Input() value: T;

    toggle = new EventEmitter<void>();

    @ViewChild(MatRadioButton, { read: ElementRef }) private content: ElementRef;

    get label() {
        return (this.content?.nativeElement?.textContent || '').trim();
    }

    get selected() {
        return this.selected$.value;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    selected$ = new BehaviorSubject(false);

    select(isSelected: boolean) {
        this.selected$.next(isSelected);
    }
}
