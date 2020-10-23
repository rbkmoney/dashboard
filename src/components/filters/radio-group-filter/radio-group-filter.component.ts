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
import { BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, mapTo, pluck, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ComponentChanges } from '../../../type-utils';
import { mapItemsToLabel } from './map-items-to-label';
import { RadioGroupFilterOptionComponent } from './radio-group-filter-option';

@Component({
    selector: 'dsh-radio-group-filter',
    templateUrl: 'radio-group-filter.component.html',
    styleUrls: ['radio-group-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupFilterComponent<T = any> implements OnInit, OnChanges, AfterContentInit {
    @Input() label: string;
    @Input() searchInputLabel?: string;
    @Input() searchPredicate?: (value: T, searchStr: string) => boolean;

    @Input() selected?: T;
    @Output() selectedChange = new EventEmitter<T>();

    @ContentChildren(RadioGroupFilterOptionComponent) options: QueryList<RadioGroupFilterOptionComponent<T>>;

    private save$ = new Subject<void>();
    private clear$ = new Subject<void>();
    private selectFromInput$ = new ReplaySubject<T>(1);

    private options$ = new BehaviorSubject<RadioGroupFilterOptionComponent<T>[]>([]);
    private selectedValues$ = new BehaviorSubject<T>(undefined);

    savedSelectedOptions$: Observable<RadioGroupFilterOptionComponent<T>> = combineLatest([
        merge(this.selectFromInput$, this.save$.pipe(withLatestFrom(this.selectedValues$), pluck(1))),
        this.options$,
    ]).pipe(
        tap(c => console.log('SELECTED', c)),
        map(([selected]) => this.mapInputValuesToOptions(selected)),
        // startWith(null),
        shareReplay(1)
    );

    title$: Observable<string> = this.savedSelectedOptions$.pipe(
        tap(c => console.log('SDASDASD', c)),
        map((selectedOptions) => ({
            selectedItemsLabels: selectedOptions.label,
            label: this.label,
            searchInputLabel: this.searchInputLabel,
        })),
        mapItemsToLabel,
        shareReplay(1)
    );

    @Input() compareWith?: (o1: T, o2: T) => boolean = (o1, o2) => o1 === o2;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        combineLatest([this.selectedValues$, this.options$]).subscribe(([selectedValues, options]) =>
            options.forEach((o) => o.select(this.compareWith(selectedValues, o.value)))
        );
        this.selectFromInput$.subscribe((selectedValues) =>
            this.selectedValues$.next(selectedValues)
        );
        this.options$
            .pipe(
                switchMap((options) => merge(...options.map((option) => option.toggle.pipe(mapTo(option.value))))),
                // withLatestFrom(this.selectedValues$),
                // pluck(1)
            )
            .subscribe((selected) => this.selectedValues$.next(selected));
        this.save$
            .pipe(
                withLatestFrom(this.selectedValues$),
                pluck(1),
                filter(v => !!v),
                map((selected) => this.mapInputValuesToOptions(selected)),
                map((options) => options.value)
            )
            .subscribe((selectedValues) => this.selectedChange.emit(selectedValues));
    }

    ngAfterContentInit() {
        this.options.changes
            .pipe(
                startWith(this.options),
                map((o: RadioGroupFilterComponent<T>['options']) => o.toArray())
            )
            .subscribe((o) => this.options$.next(o));
    }

    ngOnChanges({ selected }: ComponentChanges<RadioGroupFilterComponent>) {
        if (selected && selected.currentValue) {
            this.selectFromInput$.next(selected.currentValue);
        }
    }

    // private includesValue(values: T, value: T) {
    //     return values.findIndex((s) => this.compareWith(s, value)) !== -1;
    // }
    //
    // private toggleValue(values: T, value: T) {
    //     const idx = values.findIndex((s) => this.compareWith(s, value));
    //     const newSelected = values.slice();
    //     idx === -1 ? newSelected.push(value) : newSelected.splice(idx, 1);
    //     return newSelected;
    // }

    private mapInputValuesToOptions(inputValues: T) {
        return this.options.toArray().find((o) => this.compareWith(inputValues, o.value));
    }

    save() {
        console.log('SUKA')
        this.save$.next();
    }

    clear() {
        this.clear$.next();
    }
}
