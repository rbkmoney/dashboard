import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnChanges, Optional } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { BehaviorSubject, combineLatest, defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentChanges } from '@dsh/type-utils';
import { coerceBoolean, getFormValueChanges } from '@dsh/utils';

import { SelectSearchFieldOptions, SELECT_SEARCH_FIELD_OPTIONS } from './tokens';
import { Option } from './types';
import { filterOptions } from './utils';

@Component({
    selector: 'dsh-select-search-field',
    templateUrl: 'select-search-field.component.html',
    styleUrls: ['select-search-field.component.scss'],
    providers: [provideValueAccessor(SelectSearchFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchFieldComponent<Value> extends WrappedFormControlSuperclass<Value> implements OnChanges {
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() options: Option<Value>[];
    @Input() svgIcon: string | null = this.fieldOptions?.svgIcon;
    @Input() hint: string | null;

    selectSearchControl = new FormControl<string>('');
    filteredOptions$: Observable<Option<Value>[]> = combineLatest(
        getFormValueChanges(this.selectSearchControl),
        defer(() => this.options$)
    ).pipe(map(([value, options]) => filterOptions(options, value)));

    private options$ = new BehaviorSubject<Option<Value>[]>([]);

    constructor(
        injector: Injector,
        @Optional()
        @Inject(SELECT_SEARCH_FIELD_OPTIONS)
        private fieldOptions: SelectSearchFieldOptions
    ) {
        super(injector);
    }

    ngOnChanges({ options }: ComponentChanges<SelectSearchFieldComponent<Value>>): void {
        if (options) this.options$.next(options.currentValue);
    }

    clear(event: MouseEvent): void {
        this.formControl.setValue(null);
        event.stopPropagation();
    }
}
