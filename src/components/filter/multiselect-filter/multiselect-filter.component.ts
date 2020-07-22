import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, merge, ReplaySubject, Subject } from 'rxjs';
import { map, mapTo, pluck, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

import { ComponentChanges } from '../../../type-utils';
import { mapItemsToLabel } from './mapItemsToLabel';
import { MultiselectFilterOptionComponent } from './multiselect-filter-option';

@Component({
    selector: 'dsh-multiselect-filter',
    templateUrl: 'multiselect-filter.component.html',
    styleUrls: ['multiselect-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterComponent<T = any> implements OnInit, OnChanges, AfterContentInit {
    @Input() label: string;
    @Input() searchInputLabel?: string;
    @Input() searchPredicate?: (value: T, searchStr: string) => boolean;

    @Input() selected?: T[];
    @Output() selectedChange = new EventEmitter<T[]>();

    @ContentChildren(MultiselectFilterOptionComponent) options: QueryList<MultiselectFilterOptionComponent<T>>;

    searchControl = this.fb.control('');

    private save$ = new Subject<void>();
    private clear$ = new Subject<void>();
    private selectFromInput$ = new ReplaySubject<T[]>(1);

    private options$ = new BehaviorSubject<MultiselectFilterOptionComponent<T>[]>([]);
    private selectedValues$ = new BehaviorSubject<T[]>([]);
    savedSelectedOptions$ = combineLatest([
        merge(this.selectFromInput$, this.save$.pipe(withLatestFrom(this.selectedValues$), pluck(1))),
        this.options$,
    ]).pipe(
        map(([selected, options]) =>
            selected.map((s) => options.find((o) => this.compareWith(s, o.value))).filter((v) => v)
        ),
        shareReplay(1)
    );

    displayedOptions$ = combineLatest([
        this.options$,
        this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    ]).pipe(
        map(([options, searchStr]) => options.filter((o) => o.selected || this.searchPredicateByOption(o, searchStr))),
        shareReplay(1)
    );

    title$ = this.savedSelectedOptions$.pipe(
        map((selectedOptions) => ({
            selectedItemsLabels: selectedOptions.map(({ label }) => label),
            label: this.label,
            searchInputLabel: this.searchInputLabel,
        })),
        mapItemsToLabel,
        shareReplay(1)
    );

    @Input() compareWith?: (o1: T, o2: T) => boolean = (o1, o2) => o1 === o2;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        combineLatest([this.displayedOptions$, this.options$]).subscribe(([displayedOptions, options]) =>
            options.forEach((o) => o.display(displayedOptions.includes(o)))
        );
        combineLatest([this.selectedValues$, this.options$]).subscribe(([selectedValues, options]) =>
            options.forEach((o) => o.select(selectedValues.findIndex((s) => this.compareWith(s, o.value)) !== -1))
        );
        merge(this.selectFromInput$, this.clear$.pipe(mapTo([]))).subscribe((selectedValues) =>
            this.selectedValues$.next(selectedValues)
        );
        this.options$
            .pipe(
                switchMap((options) => merge(...options.map((option) => option.toggle.pipe(mapTo(option.value))))),
                withLatestFrom(this.selectedValues$),
                map(([o, selected]) => {
                    const idx = selected.findIndex((s) => this.compareWith(s, o));
                    const newSelected = selected.slice();
                    idx === -1 ? newSelected.push(o) : newSelected.splice(idx, 1);
                    return newSelected;
                })
            )
            .subscribe((selected) => this.selectedValues$.next(selected));
    }

    ngAfterContentInit() {
        this.options.changes
            .pipe(
                startWith(this.options),
                map((o: MultiselectFilterComponent<T>['options']) => o.toArray())
            )
            .subscribe((o) => this.options$.next(o));
    }

    ngOnChanges({ selected }: ComponentChanges<MultiselectFilterComponent>) {
        if (selected) {
            this.selectFromInput$.next(selected.currentValue);
        }
    }

    private searchPredicateByOption(option: MultiselectFilterOptionComponent, searchStr: string) {
        if (this.searchPredicate) {
            return this.searchPredicate(option.value, searchStr);
        }
        return option.label.toLowerCase().trim().includes(searchStr.toLowerCase().trim());
    }

    save() {
        this.searchControl.patchValue('');
        this.save$.next();
    }

    clear() {
        this.searchControl.patchValue('');
        this.clear$.next();
    }
}
