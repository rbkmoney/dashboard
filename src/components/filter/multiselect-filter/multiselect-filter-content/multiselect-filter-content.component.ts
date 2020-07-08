import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { ComponentChanges } from '../../../../type-utils';
import { MultiselectFilterItem } from '../multiselect-filter-item';

@Component({
    selector: 'dsh-multiselect-filter-content',
    templateUrl: 'multiselect-filter-content.component.html',
    styleUrls: ['multiselect-filter-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterContentComponent<T = any> implements OnInit, OnChanges {
    @Input() label: string;
    @Input() items: MultiselectFilterItem<T>[];
    @Input() selectedItems?: (MultiselectFilterItem<T> | MultiselectFilterItem<T>['id'])[];

    @Output() selectedChange = new EventEmitter<MultiselectFilterItem<T>[]>();
    @Output() foundChange = new EventEmitter<MultiselectFilterItem<T>[]>();

    form = this.fb.group({
        search: '',
        items: this.fb.array([]),
    });
    get itemsForm() {
        return this.form.controls.items as FormArray;
    }

    items$ = new BehaviorSubject([]);
    displayedItemsIdx$ = combineLatest([
        (this.form.controls.search.valueChanges as Observable<string>).pipe(
            startWith(this.form.controls.search.value as string)
        ),
        this.items$,
    ]).pipe(
        debounceTime(200),
        map(([value, items]) =>
            items.reduce(
                (acc, item, idx) =>
                    this.itemsForm.controls[idx].value || this.filterPredicate(value, item, idx, items)
                        ? acc.concat(idx)
                        : acc,
                [] as number[]
            )
        ),
        shareReplay(1)
    );

    @Input() filterPredicate: (
        value: string,
        item: MultiselectFilterItem<T>,
        idx: number,
        items: MultiselectFilterItem<T>[]
    ) => boolean = (value, item) => item.label.toLowerCase().trim().includes(value.toLowerCase().trim());

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        (this.itemsForm.valueChanges as Observable<boolean[]>)
            .pipe(
                map((values) => this.getSelected(values)),
                distinctUntilChanged((x, y) => x.length === y.length && x.every((v, idx) => v === y[idx]))
            )
            .subscribe((found) => this.foundChange.emit(found));
    }

    ngOnChanges({ items, selectedItems }: ComponentChanges<MultiselectFilterContentComponent<T>>) {
        if (items && items.currentValue !== items.previousValue) {
            const currentItems = items.currentValue || [];
            this.items$.next(currentItems);
            this.itemsForm.clear();
            for ({} of currentItems) {
                this.itemsForm.push(this.fb.control(false));
            }
        }
        if (selectedItems && selectedItems.currentValue !== selectedItems.previousValue) {
            if (this.items) {
                const currentSelectedItems = selectedItems.currentValue || [];
                const newValue = new Array(this.items.length || 0).fill(false);
                for (const selected of currentSelectedItems) {
                    const selectedId = typeof selected === 'object' ? selected.id : selected;
                    const idx = this.items.findIndex(({ id }) => id === selectedId);
                    this.itemsForm.controls[idx].patchValue(true);
                }
            }
        }
    }

    private getSelected(values: boolean[] = this.itemsForm.value) {
        return values.reduce((acc, v, idx) => (v ? [...acc, this.items[idx]] : acc), [] as MultiselectFilterItem<T>[]);
    }

    clear() {
        this.form.patchValue({ search: '' });
        this.itemsForm.reset();
    }

    save() {
        this.form.patchValue({ search: '' });
        this.selectedChange.emit(this.getSelected(this.form.value.items));
    }
}
