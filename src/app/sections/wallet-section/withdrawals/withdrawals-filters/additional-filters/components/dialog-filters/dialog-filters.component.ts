import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';

import { WithdrawalsSearchParams } from '@dsh/api';
import { RequiredSuper, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../../types';
import { filtersToForm, formToFilters } from '../../utils';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFiltersComponent
    extends ValidatedWrappedAbstractControlSuperclass<WithdrawalsSearchParams, AdditionalFiltersForm>
    implements OnInit
{
    formControl = this.fb.group<AdditionalFiltersForm>({
        mainInfo: null,
        status: null,
        amount: null,
    });

    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFiltersForm>,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.formControl.patchValue(filtersToForm(this.data));
        return super.ngOnInit();
    }

    clear(): void {
        this.formControl.reset();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(formToFilters(this.formControl.value));
    }
}
