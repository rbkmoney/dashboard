import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { removeDictEmptyFields } from '@dsh/utils';

import { AdditionalFilters } from '../../types/additional-filters';
import { AdditionalFiltersForm } from '../../types/additional-filters-form';
import { MainFilters } from '../../types/main-filters';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    styleUrls: ['dialog-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFiltersComponent implements OnInit {
    get mainFiltersGroup(): FormGroup<MainFilters> {
        return this.form.controls.mainFilters as FormGroup<MainFilters>;
    }

    form: FormGroup<AdditionalFiltersForm> = this.formBuilder.group({
        mainFilters: this.formBuilder.group<MainFilters>({
            payerEmail: ['', Validators.email],
            customerID: [''],
            rrn: ['', Validators.pattern(new RegExp(/^\d+$/))],
        }),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        const { payerEmail = '', customerID = '', rrn = '' } = this.data;
        this.form.setValue({
            mainFilters: {
                payerEmail,
                customerID,
                rrn,
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
    }
}
