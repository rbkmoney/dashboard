import { Component, Injector, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentChanges } from '@rbkmoney/utils';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import isNil from 'lodash-es/isNil';

export interface Option<T> {
    value: T;
    label?: string;
}

interface OptionScore<T> {
    option: Option<T>;
    score: number;
}

@UntilDestroy()
@Component({
    selector: 'dsh-multi-select-field',
    templateUrl: 'multi-select-field.component.html',
    styleUrls: ['multi-select-field.component.scss'],
    providers: [provideValueAccessor(MultiSelectFieldComponent)],
})
export class MultiSelectFieldComponent<T> extends FormControlSuperclass<T[]> implements OnChanges {
    @Input() label: string;
    @Input() options: Option<T>[];

    selected = new Set<T>();
    filtered: Option<T>[] = [];
    searchStr: string = '';

    constructor(private fb: FormBuilder, injector: Injector) {
        super(injector);
    }

    @Input() searchPredicate?: (option: Option<T>, searchStr: string) => number = (option) =>
        option?.label?.includes(this.searchStr) || JSON.stringify(option.value).includes(this.searchStr) ? 1 : 0;

    ngOnChanges({ options }: ComponentChanges<MultiSelectFieldComponent<T>>): void {
        if (options) {
            this.search();
        }
    }

    handleIncomingValue(value: T[]): void {
        if (isNil(value)) this.searchStr = '';
        this.selected = new Set(value);
        this.search();
    }

    toggle({ value }: Option<T>): void {
        if (this.selected.has(value)) this.selected.delete(value);
        else this.selected.add(value);
        this.emitOutgoingValue(Array.from(this.selected.values()));
        this.search();
    }

    search(searchStr: string = this.searchStr): void {
        this.searchStr = searchStr;
        this.filtered = this.options
            .map(
                (option) =>
                    ({
                        option,
                        score: this.searchPredicate(option, searchStr),
                    } as OptionScore<T>)
            )
            .filter((v) => this.selected.has(v.option.value) || v.score > 0)
            .sort((a, b) => a.score - b.score)
            .map((v) => v.option);
    }
}
