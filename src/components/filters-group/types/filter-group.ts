import { EventEmitter } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ComponentChanges } from '@rbkmoney/utils';

import { getFormValueChanges } from '@dsh/utils';

// TODO: to FormGroupSuperclass
console.log('!!! remove it');
export class FilterGroup<T> {
    defaultParams: T;
    changed: EventEmitter<T>;

    form: FormGroup<T>;

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.changed.next(filters));
    }

    ngOnChanges({ defaultParams }: ComponentChanges<FilterGroup<T>>): void {
        if (defaultParams?.firstChange && defaultParams.currentValue) this.form.patchValue(defaultParams.currentValue);
    }
}
