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
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import { BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import {
    distinctUntilChanged,
    map,
    mapTo,
    pluck,
    shareReplay,
    startWith,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';

import { ComponentChanges } from '../../../type-utils';
import { coerceBoolean } from '../../../utils/coerce';
import { RadioGroupFilterOptionComponent } from './radio-group-filter-option';

@Component({
    selector: 'dsh-radio-group-filter',
    templateUrl: 'radio-group-filter.component.html',
    styleUrls: ['radio-group-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupFilterComponent<T = any> implements OnInit, OnChanges, AfterContentInit {
    @Input() label: string;
    @Input() @coerceBoolean withoutClear = false;

    @Input() selected?: T;
    @Output() selectedChange = new EventEmitter<T>();

    @ContentChildren(RadioGroupFilterOptionComponent) options: QueryList<RadioGroupFilterOptionComponent<T>>;

    private save$ = new Subject<void>();
    private clear$ = new Subject<void>();
    private selectFromInput$ = new ReplaySubject<T>(1);

    private options$ = new BehaviorSubject<RadioGroupFilterOptionComponent<T>[]>([]);
    private selectedValue$ = new BehaviorSubject<T>(undefined);

    savedSelectedOption$: Observable<RadioGroupFilterOptionComponent<T>> = combineLatest([
        merge(this.selectFromInput$, this.save$.pipe(withLatestFrom(this.selectedValue$), pluck(1))),
        this.options$,
    ]).pipe(
        map(([selected]) => this.mapInputValueToOption(selected)),
        startWith<RadioGroupFilterOptionComponent<T>, null>(null),
        shareReplay(1)
    );

    title$: Observable<string> = this.savedSelectedOption$.pipe(
        map((selectedOption: RadioGroupFilterOptionComponent<T> | null) => {
            if (isNil(selectedOption) || isEmpty(selectedOption.value)) {
                return this.label;
            }
            return this.formatSelectedLabel(selectedOption.label);
        }),
        shareReplay(1)
    );

    @Input() formatSelectedLabel?: (o: T) => string = (o) => o.toString();

    @Input() compareWith?: (o1: T, o2: T) => boolean = (o1, o2) => o1 === o2;

    ngOnInit() {
        combineLatest([this.selectedValue$, this.options$]).subscribe(([selectedValue, options]) =>
            options.forEach((o) => o.select(this.compareWith(selectedValue, o.value)))
        );
        merge(this.selectFromInput$, this.clear$.pipe(mapTo(undefined))).subscribe((selectedValue) =>
            this.selectedValue$.next(selectedValue)
        );
        this.options$
            .pipe(switchMap((options) => merge(...options.map((option) => option.toggle.pipe(mapTo(option.value))))))
            .subscribe((selected) => this.selectedValue$.next(selected));
        this.save$
            .pipe(
                withLatestFrom(this.selectedValue$),
                pluck(1),
                distinctUntilChanged(),
                map((selected) => this.mapInputValueToOption(selected)),
                map((option) => option?.value)
            )
            .subscribe((selectedValue) => this.selectedChange.emit(selectedValue));
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

    private mapInputValueToOption(inputValue: T) {
        return this.options.toArray().find((o) => this.compareWith(inputValue, o.value));
    }

    save() {
        this.save$.next();
    }

    clear() {
        this.clear$.next();
    }
}
