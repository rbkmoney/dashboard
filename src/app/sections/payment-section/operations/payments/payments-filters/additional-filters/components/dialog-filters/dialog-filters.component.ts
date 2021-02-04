import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { getAbstractControl } from '@dsh/app/shared/utils';
import { removeDictEmptyFields } from '@dsh/utils';

import { MainFilters } from '../../main-filters';
import { paymentStatusValidator, StatusFilters } from '../../status-filters';
import { AdditionalFilters } from '../../types/additional-filters';
import { AdditionalFiltersForm } from '../../types/additional-filters-form';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    styleUrls: ['dialog-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFiltersComponent implements OnInit {
    form: FormGroup<AdditionalFiltersForm> = this.formBuilder.group({
        mainFilters: this.formBuilder.group<MainFilters>({
            payerEmail: ['', Validators.email],
            customerID: [''],
            rrn: ['', Validators.pattern(new RegExp(/^\d+$/))],
        }),
        statusFilters: this.formBuilder.group<StatusFilters>({
            paymentStatus: [null, paymentStatusValidator],
        }),
    });

    get mainFiltersGroup(): FormGroup<MainFilters> {
        return getAbstractControl<FormGroup<MainFilters>>(this.form, 'mainFilters');
    }

    get statusFiltersGroup(): FormGroup<StatusFilters> {
        return getAbstractControl<FormGroup<StatusFilters>>(this.form, 'statusFilters');
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        const { payerEmail = '', customerID = '', rrn = '', paymentStatus = null } = this.data;
        this.form.setValue({
            mainFilters: {
                payerEmail,
                customerID,
                rrn,
            },
            statusFilters: {
                paymentStatus,
            },
        });
    }

    clear(): void {
        this.resetFiltersData();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(this.getFiltersData());
    }

    private getFiltersData(): AdditionalFilters {
        return removeDictEmptyFields({
            ...this.extractGroupValidFields(this.mainFiltersGroup),
            ...this.extractGroupValidFields(this.statusFiltersGroup),
        });
    }

    private extractGroupValidFields<T>(group: FormGroup<T>): Partial<T> {
        return Object.entries(group.controls).reduce((acc: Partial<T>, [key, control]: [string, AbstractControl]) => {
            if (control.valid) {
                acc[key] = control.value;
            }
            return acc;
        }, {});
    }

    private resetFiltersData(): void {
        this.mainFiltersGroup.reset();
        this.statusFiltersGroup.reset();
    }
}
