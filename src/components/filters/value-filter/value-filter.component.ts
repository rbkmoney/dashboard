import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { ComponentChanges } from '../../../type-utils';

@Component({
    selector: 'dsh-value-filter',
    templateUrl: 'value-filter.component.html',
    styleUrls: ['value-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueFilterComponent implements OnChanges {
    @Input() label: string;
    @Input() selectedLabel?: string;
    @Input() placeholder?: string;
    @Input() type?: 'number' | 'text' = 'text';

    @Input() value: string | number;
    @Output() valueChanges = new EventEmitter<string | number>();
    private savedValue$ = new ReplaySubject<string>();

    control = new FormControl();
    label$ = this.savedValue$.pipe(
        startWith<string, undefined>(undefined),
        map((v) => {
            if (!v) {
                return this.label;
            }
            if (this.selectedLabel) {
                return this.selectedLabel + v;
            }
            return this.selectedLabel || this.label;
        }),
        shareReplay(1)
    );
    active$ = this.savedValue$.pipe(
        map((v) => !!v),
        shareReplay(1)
    );

    constructor() {
        this.savedValue$.pipe(distinctUntilChanged()).subscribe((v) => {
            this.valueChanges.next(v);
            this.value = v;
        });
    }

    ngOnChanges({ value }: ComponentChanges<ValueFilterComponent>) {
        if (value) {
            this.control.setValue(value.currentValue);
            this.save();
        }
    }

    clear() {
        this.control.setValue(undefined);
    }

    save() {
        this.savedValue$.next(this.control.value);
    }
}
