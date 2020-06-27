import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs/operators';

export interface Item {
    label?: string;
    value: string;
}

export interface DisplayedItem {
    item: Item;
    found: boolean;
    selected: boolean;
}

@Component({
    selector: 'dsh-filter-by-input',
    templateUrl: 'filter-by-input.component.html',
    styleUrls: ['filter-by-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByInputComponent implements OnInit, OnChanges {
    @Input() label: string;
    @Input() items: Item[] = [];
    @Output() selectedChange = new EventEmitter<Item[]>();
    @Output() foundChange = new EventEmitter<Item[]>();

    form = this.fb.group({
        search: '',
        items: this.fb.array([]),
    });
    get itemsForm() {
        return this.form.controls.items as FormArray;
    }
    private savedValue = this.form.value;

    hasOverflowY$ = this.itemsForm.statusChanges.pipe(
        startWith(this.itemsForm.status),
        map(() => this.itemsForm.controls.filter((c) => c.enabled).length > 5),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const searchControl = this.form.controls.search;
        searchControl.valueChanges.pipe(startWith(searchControl.value)).subscribe((value) => {
            if (this.items) {
                const lowerValue = value.toLowerCase().trim();
                for (const [idx, item] of Object.entries(this.items)) {
                    const enabled = item.value.toLowerCase().trim().includes(lowerValue);
                    const control = this.itemsForm.controls[idx];
                    if (enabled) {
                        if (control.disabled) {
                            control.enable();
                        }
                    } else if (control.enabled && !control.value) {
                        control.disable();
                    }
                }
            }
        });
        (this.itemsForm.valueChanges as Observable<boolean[]>)
            .pipe(
                map((values) => this.getSelected(values)),
                distinctUntilChanged((x, y) => x.length === y.length && x.every((v, idx) => v === y[idx]))
            )
            .subscribe((found) => this.foundChange.emit(found));
    }

    ngOnChanges({ items }: SimpleChanges) {
        if (items.currentValue !== items.previousValue) {
            const currentItems: Item[] = items.currentValue || [];
            this.itemsForm.clear();
            for ({} of currentItems) {
                this.itemsForm.push(this.fb.control(false));
            }
        }
    }

    private getSelected(values: boolean[] = this.itemsForm.value) {
        return values.reduce((acc, v, idx) => (v ? [...acc, this.items[idx]] : acc), [] as Item[]);
    }

    clear() {
        this.form.patchValue({ search: '' });
        this.itemsForm.reset();
    }

    save() {
        this.form.patchValue({ search: '' });
        this.savedValue = this.form.value;
        this.selectedChange.emit(this.getSelected(this.savedValue.items));
    }

    revert() {
        this.clear();
        this.form.patchValue(this.savedValue);
    }
}
