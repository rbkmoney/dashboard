import { ChangeDetectionStrategy, Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import {
    ValidatedWrappedAbstractControlSuperclass,
    RequiredSuper,
    REQUIRED_SUPER,
    createValidatedAbstractControlProviders,
} from '@dsh/utils';

import { paymentStatusValidator } from '../../payment-status-filter';
import { AdditionalFilters, AdditionalFiltersForm } from '../../types';
import { formToFilters, filtersToForm } from '../../utils';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(DialogFiltersComponent),
})
export class DialogFiltersComponent
    extends ValidatedWrappedAbstractControlSuperclass<AdditionalFiltersForm>
    implements OnInit
{
    formControl: FormGroup<AdditionalFiltersForm> = this.formBuilder.group({
        main: null,
        paymentStatus: [null, paymentStatusValidator],
        paymentSum: null,
        tokenProvider: null,
        paymentSystem: null,
        invoices: null,
        shops: null,
        binPan: null,
    });

    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.formControl.patchValue(filtersToForm(this.data));
        super.ngOnInit();
        return REQUIRED_SUPER;
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
