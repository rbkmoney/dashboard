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
import { BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, mapTo, pluck, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

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

    @Input() selected?: T;
    @Output() selectedChange = new EventEmitter<T>();

    @ContentChildren(RadioGroupFilterOptionComponent) options: QueryList<RadioGroupFilterOptionComponent<T>>;

    private save$ = new Subject<void>();
    private selectFromInput$ = new ReplaySubject<T>(1);

    private options$ = new BehaviorSubject<RadioGroupFilterOptionComponent<T>[]>([]);
    private selectedValue$ = new BehaviorSubject<T>(undefined);

    savedSelectedOption$: Observable<RadioGroupFilterOptionComponent<T>> = combineLatest([
        merge(this.selectFromInput$, this.save$.pipe(withLatestFrom(this.selectedValue$), pluck(1))),
        this.options$,
    ]).pipe(
        map(([selected]) => this.mapInputValueToOption(selected)),
        startWith(null),
        shareReplay(1)
    );

    title$: Observable<string> = this.savedSelectedOption$.pipe(
        map((selectedOptions) => ({
            selectedItemLabel: selectedOptions?.label,
            label: this.label,
            formatSelectedLabel: this.formatSelectedLabel,
        })),
        mapItemsToLabel,
        shareReplay(1)
    );

    @Input() formatSelectedLabel?: (o: T) => string = (o) => o.toString();

    @Input() compareWith?: (o1: T, o2: T) => boolean = (o1, o2) => o1 === o2;

    ngOnInit() {
        combineLatest([this.selectedValue$, this.options$]).subscribe(([selectedValues, options]) =>
            options.forEach((o) => o.select(this.compareWith(selectedValues, o.value)))
        );
        this.selectFromInput$.subscribe((selectedValues) => this.selectedValue$.next(selectedValues));
        this.options$
            .pipe(switchMap((options) => merge(...options.map((option) => option.toggle.pipe(mapTo(option.value))))))
            .subscribe((selected) => this.selectedValue$.next(selected));
        this.save$
            .pipe(
                withLatestFrom(this.selectedValue$),
                pluck(1),
                filter((v) => !!v),
                map((selected) => this.mapInputValueToOption(selected)),
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

    private mapInputValueToOption(inputValues: T) {
        return this.options.toArray().find((o) => this.compareWith(inputValues, o.value));
    }

    save() {
        this.save$.next();
    }
}
