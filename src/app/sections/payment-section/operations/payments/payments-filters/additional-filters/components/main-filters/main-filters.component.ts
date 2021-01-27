import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash.isequal';

import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { MainFilters } from '../../types/main-filters';

@UntilDestroy()
@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFiltersComponent implements OnInit, OnChanges {
    @Input() data: MainFilters;

    @Output() filtersChanged = new EventEmitter<Partial<MainFilters>>();

    form: FormGroup<MainFilters> = this.formBuilder.group({
        payerEmail: ['', Validators.email],
        customerID: [''],
        rrn: ['', Validators.pattern(`/\d+/`)],
    });

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((changedFilters: MainFilters) => {
            const validFiltersData = this.getValidFilterValues(changedFilters);

            this.filtersChanged.emit(validFiltersData);
        });
    }

    ngOnChanges(changes: ComponentChanges<MainFiltersComponent>): void {
        if (changes.data) {
            this.updateFiltersData(changes.data);
        }
    }

    private updateFiltersData({ previousValue, currentValue }: ComponentChange<MainFiltersComponent, 'data'>): void {
        if (!isEqual(previousValue, currentValue)) {
            this.form.setValue({
                ...currentValue,
            });
        }
    }

    private getValidFilterValues(filters: MainFilters): Partial<MainFilters> {
        return Object.entries(filters).reduce(
            (validValues: Partial<MainFilters>, [key, value]: [keyof MainFilters, string]) => {
                const filterControl = this.form.controls[key];

                if (filterControl.valid) {
                    validValues[key] = value;
                }

                return validValues;
            },
            {}
        );
    }
}
