import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, shareReplay, startWith, withLatestFrom } from 'rxjs/operators';

import { mapIdxBooleanToFilteredArray } from './map-idx-boolean-to-filtered-array';
import { mapItemsToLabel } from './mapItemsToLabel';
import { MultiselectFilterOptionComponent } from './multiselect-filter-option';
import { reduceIdxToBooleanMap } from './reduce-idx-to-boolean-map';

@Component({
    selector: 'dsh-multiselect-filter',
    templateUrl: 'multiselect-filter.component.html',
    styleUrls: ['multiselect-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterComponent<T = any> implements AfterContentInit, OnInit {
    @Input() label: string;
    @Input() searchInputLabel?: string;
    @Input() searchPredicate?: (value: T, searchStr: string) => boolean;

    @Output() selectedChange = new EventEmitter<T[]>();

    @ContentChildren(MultiselectFilterOptionComponent) options: QueryList<MultiselectFilterOptionComponent<T>>;

    searchControl = this.fb.control('');

    private save$ = new Subject<void>();
    private clear$ = new Subject<void>();

    options$ = new BehaviorSubject<MultiselectFilterOptionComponent<T>[]>([]);
    selectedOptionsByIdx$ = this.options$.pipe(
        map((o) => o.map(({ selected$ }) => selected$)),
        reduceIdxToBooleanMap,
        shareReplay(1)
    );
    savedSelectedOptions$ = this.options$.pipe(
        map((o) => o.map(({ savedSelected$ }) => savedSelected$)),
        reduceIdxToBooleanMap,
        withLatestFrom(this.options$, (idxToBooleanMap, array) => ({ idxToBooleanMap, array })),
        mapIdxBooleanToFilteredArray,
        shareReplay(1)
    );
    displayedOptions$ = combineLatest([
        this.options$,
        this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    ]).pipe(
        withLatestFrom(this.selectedOptionsByIdx$, ([options, searchStr], selectedOptionsIdx) =>
            options.filter((o, idx) => selectedOptionsIdx[idx] || this.searchPredicateByOption(o, searchStr))
        ),
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

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.displayedOptions$
            .pipe(withLatestFrom(this.options$))
            .subscribe(([displayedOptions, options]) =>
                options.forEach((o) => o.display(displayedOptions.includes(o)))
            );
        this.clear$
            .pipe(withLatestFrom(this.options$, (_, o) => o))
            .subscribe((options) => options.forEach((o) => o.select(false)));
        this.save$
            .pipe(withLatestFrom(this.options$, (_, o) => o))
            .subscribe((options) => options.forEach((o) => o.save()));
        this.save$
            .pipe(
                withLatestFrom(this.selectedOptionsByIdx$, this.options$, (_, idxToBooleanMap, array) => ({
                    idxToBooleanMap,
                    array,
                })),
                mapIdxBooleanToFilteredArray,
                map((selectedOptions) => selectedOptions.map(({ value }) => value))
            )
            .subscribe((selectedOptions) => this.selectedChange.emit(selectedOptions));
    }

    ngAfterContentInit() {
        this.options.changes
            .pipe(
                startWith(this.options),
                map((o: MultiselectFilterComponent<T>['options']) => o.toArray())
            )
            .subscribe((o) => this.options$.next(o));
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
