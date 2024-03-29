import { ChangeDetectionStrategy, Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import {
    ValidatedWrappedAbstractControlSuperclass,
    RequiredSuper,
    createValidatedAbstractControlProviders,
} from '@dsh/utils';

import { AdditionalFilters } from '../../types';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(DialogFiltersComponent),
})
export class DialogFiltersComponent
    extends ValidatedWrappedAbstractControlSuperclass<AdditionalFilters>
    implements OnInit
{
    formControl: FormGroup<AdditionalFilters> = this.formBuilder.group({
        invoiceIDs: null,
        shopIDs: null,
        refundStatus: null,
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
        this.formControl.patchValue(this.data);
        return super.ngOnInit();
    }

    clear(): void {
        this.formControl.reset();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(this.formControl.value);
    }
}
