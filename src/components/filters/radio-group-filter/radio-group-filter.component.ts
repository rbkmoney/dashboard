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
import { map, mapTo, pluck, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

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
    @Input() filterLabel: string;

    @Input() selected?: T;
    @Output() selectedChange = new EventEmitter<T>();

    @ContentChildren(RadioGroupFilterOptionComponent) options: QueryList<RadioGroupFilterOptionComponent<T>>;

    private save$ = new Subject<void>();
    private selectFromInput$ = new ReplaySubject<T[]>(1);

    private options$ = new BehaviorSubject<RadioGroupFilterOptionComponent<T>[]>([]);
    private selectedValues$ = new ReplaySubject<T>();

    savedSelectedOptions$: Observable<RadioGroupFilterOptionComponent<T>[]> = combineLatest([
        merge(this.selectFromInput$, this.save$.pipe(withLatestFrom(this.selectedValues$), pluck(1))),
        this.options$,
    ]).pipe(
        map(([selected]) => this.mapInputValuesToOptions(selected)),
        startWith([]),
        shareReplay(1)
    );

    displayedOptions$: Observable<RadioGroupFilterOptionComponent<T>[]> = combineLatest([
        this.options$,
        this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    ]).pipe(
        map(([options, searchStr]) => options.filter((o) => this.checkDisplayOption(o, searchStr))),
        shareReplay(1)
    );

    title$: Observable<string> = this.savedSelectedOptions$.pipe(
        map((selectedOption) => ({
            filterTitle: this.filterLabel,
            label: selectedOption[0].label,
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
            options.forEach((o) => o.select(this.includesValue(selectedValues, o.value)))
        );
        merge(this.selectFromInput$, this.clear$.pipe(mapTo([]))).subscribe((selectedValues) =>
            this.selectedValues$.next(selectedValues)
        );
        this.options$
            .pipe(
                switchMap((options) => merge(...options.map((option) => option.toggle.pipe(mapTo(option.value))))),
                withLatestFrom(this.selectedValues$),
                map(([o, selected]) => this.toggleValue(selected, o))
            )
            .subscribe((selected) => this.selectedValues$.next(selected));
        this.save$
            .pipe(
                withLatestFrom(this.selectedValues$),
                pluck(1),
                map((selected) => this.mapInputValuesToOptions(selected)),
                map((options) => options.map(({ value }) => value))
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

    private checkDisplayOption(option: RadioGroupFilterOptionComponent, searchStr: string) {
        if (option.selected) {
            return true;
        } else if (this.searchPredicate) {
            return this.searchPredicate(option.value, searchStr);
        }
        return option.label.toLowerCase().trim().includes(searchStr.toLowerCase().trim());
    }

    private includesValue(values: T[], value: T) {
        return values.findIndex((s) => this.compareWith(s, value)) !== -1;
    }

    private toggleValue(values: T[], value: T) {
        const idx = values.findIndex((s) => this.compareWith(s, value));
        const newSelected = values.slice();
        idx === -1 ? newSelected.push(value) : newSelected.splice(idx, 1);
        return newSelected;
    }

    private mapInputValuesToOptions(inputValues: T[]) {
        return inputValues
            .map((s) => this.options.toArray().find((o) => this.compareWith(s, o.value)))
            .filter((v) => v);
    }

    save() {
        this.searchControl.patchValue('');
        this.save$.next();
    }

}
