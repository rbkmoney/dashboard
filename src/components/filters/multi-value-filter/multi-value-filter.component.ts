import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import isEqual from 'lodash-es/isEqual';
import negate from 'lodash-es/negate';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { ComponentChanges } from '../../../type-utils';

function isEmpty(value: any[]) {
    return !value?.length || value?.every((v) => !v);
}

@Component({
    selector: 'dsh-multi-value-filter',
    templateUrl: 'multi-value-filter.component.html',
    styleUrls: ['multi-value-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiValueFilterComponent implements OnChanges {
    @Input() label: string;
    @Input() selectedLabel?: string;
    @Input() selectedLabelPredicate?: (value: string[]) => string;
    @Input() placeholder?: string;

    @Input() value: string[];
    @Output() valueChanges = new EventEmitter<string[]>();
    private savedValue$ = new ReplaySubject<string[]>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form = new FormArray([]);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    active$ = this.savedValue$.pipe(startWith<string[], undefined>(undefined), map(negate(isEmpty)), shareReplay(1));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    label$ = this.savedValue$.pipe(
        startWith<string[], undefined>(undefined),
        map((v: string[]) => {
            if (isEmpty(v)) {
                return this.label;
            }
            if (this.selectedLabelPredicate) {
                return this.selectedLabelPredicate(v);
            }
            return `${this.selectedLabel || this.label} · ${v.length}`;
        }),
        shareReplay(1)
    );

    constructor() {
        this.addControl();
        this.savedValue$.pipe(distinctUntilChanged(isEqual)).subscribe((v) => {
            this.valueChanges.next(v);
            this.value = v;
        });
    }

    ngOnChanges({ value }: ComponentChanges<MultiValueFilterComponent>) {
        if (value) {
            this.setValue(value.currentValue);
            this.save();
        }
    }

    addControl(value?: string) {
        this.form.push(new FormControl(value));
    }

    removeControl(idx: number) {
        this.form.removeAt(idx);
    }

    clear() {
        this.setValue();
    }

    save() {
        this.setValue(this.form.value.filter((v) => v));
        this.savedValue$.next(isEmpty(this.form.value) ? [] : this.form.value);
    }

    private setValue(value?: string[]) {
        this.form.clear();
        if (value?.length) {
            for (const v of value) {
                this.addControl(v);
            }
        } else {
            this.addControl();
        }
    }
}
