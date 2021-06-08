import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { wrapMethod } from '@s-libs/js-core';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { Option } from './types';

const filterPredicate = <T>(searchStr: string) => (option: Option<T>) => option.label.toLowerCase().includes(searchStr);
const filterOptions = <T>(options: Option<T>[]) => (controlValue: unknown): Option<T>[] =>
    typeof controlValue === 'string' ? options.filter(filterPredicate(controlValue.toLowerCase())) : options;

@Component({
    selector: 'dsh-autocomplete-field-2',
    templateUrl: 'autocomplete-field.component.html',
    styleUrls: ['autocomplete-field.component.scss'],
    providers: [provideValueAccessor(AutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteFieldComponent<OptionValue> extends FormControlSuperclass<OptionValue> implements OnInit {
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() options: Option<OptionValue>[];
    @Input() displayWith: ((value: OptionValue) => string) | null;

    formControl = new FormControl();

    filteredOptions$: Observable<Option<OptionValue>[]>;

    private incomingValues$ = new Subject<OptionValue>();

    constructor(injector: Injector) {
        super(injector);
        this.subscribeTo(this.setUpOuterToInner$(this.incomingValues$), (inner) => {
            this.formControl.setValue(inner, { emitEvent: false });
        });
        this.subscribeTo(this.setUpInnerToOuter$(this.formControl.valueChanges), (outer) => {
            this.emitOutgoingValue(outer);
        });
        wrapMethod(this.formControl, 'markAsTouched', {
            after: () => {
                this.onTouched();
            },
        });
    }

    ngOnInit(): void {
        this.filteredOptions$ = this.formControl.valueChanges.pipe(
            startWith(this.options),
            map(filterOptions(this.options))
        );
    }

    clearValue(): void {
        this.formControl.setValue(null);
    }

    handleIncomingValue(value: OptionValue): void {
        this.incomingValues$.next(value);
    }

    private outerToInner(outer: OptionValue): OptionValue {
        return (outer as unknown) as OptionValue;
    }

    private setUpOuterToInner$(outer$: Observable<OptionValue>): Observable<OptionValue> {
        return outer$.pipe(map((outer) => this.outerToInner(outer)));
    }

    private innerToOuter(inner: OptionValue): OptionValue {
        return (inner as unknown) as OptionValue;
    }

    private setUpInnerToOuter$(inner$: Observable<OptionValue>): Observable<OptionValue> {
        return inner$.pipe(map((inner) => this.innerToOuter(inner)));
    }
}
