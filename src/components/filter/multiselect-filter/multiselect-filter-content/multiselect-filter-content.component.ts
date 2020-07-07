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
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

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
    selector: 'dsh-multiselect-filter-content',
    templateUrl: 'multiselect-filter-content.component.html',
    styleUrls: ['multiselect-filter-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterContentComponent implements OnInit, OnChanges {
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

    @Input() filterPredicate: (value: string, item: Item, idx: number, items: Item[]) => boolean = (value, item) =>
        item.value.toLowerCase().trim().includes(value.toLowerCase().trim());

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
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
            this.items$.next(currentItems);
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
        this.selectedChange.emit(this.getSelected(this.form.value.items));
    }
}
