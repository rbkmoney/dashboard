import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';

import { getAbstractControl } from '@dsh/app/shared/utils';
import { formatMajorAmountToStr, getAmountNum } from '@dsh/app/shared/utils/amount-formatters';
import { removeDictEmptyFields } from '@dsh/utils';

import { MainInfoFilters } from '../../main-info-filters';
import { AdditionalFilters } from '../../types/additional-filters';
import { AdditionalFiltersForm } from '../../types/additional-filters-form';
import { WithdrawalStatusFilterValue } from '../../withdrawal-status-filter';
import { WithdrawalSumFilter } from '../../withdrawal-sum-filter';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    styleUrls: ['dialog-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFiltersComponent implements OnInit {
    form: FormGroup<AdditionalFiltersForm> = this.fb.group({
        main: this.fb.group<MainInfoFilters>({
            withdrawalID: [''],
            walletID: [''],
            identityID: [''],
            destinationID: [''],
        }),
        status: [null],
        withdrawalSum: this.fb.group<WithdrawalSumFilter>({
            min: [''],
            max: [''],
        }),
    });

    get mainFiltersGroup(): FormGroup<MainInfoFilters> {
        return getAbstractControl<FormGroup<MainInfoFilters>>(this.form, 'main');
    }

    get statusFilterControl(): FormControl<WithdrawalStatusFilterValue> {
        return getAbstractControl<FormControl<WithdrawalStatusFilterValue>>(this.form, 'status');
    }

    get withdrawalSumFiltersGroup(): FormGroup<WithdrawalSumFilter> {
        return getAbstractControl<FormGroup<WithdrawalSumFilter>>(this.form, 'withdrawalSum');
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
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

    private initForm(): void {
        this.form.setValue(this.getInitFormValues());
    }

    private getInitFormValues(): AdditionalFiltersForm {
        const {
            withdrawalID = '',
            walletID = '',
            identityID = '',
            destinationID = '',
            status = null,
            amountFrom = null,
            amountTo = null,
        } = this.data;
        return {
            main: {
                withdrawalID,
                walletID,
                identityID,
                destinationID,
            },
            status,
            withdrawalSum: {
                min: formatMajorAmountToStr(amountFrom),
                max: formatMajorAmountToStr(amountTo),
            },
        };
    }

    private getFiltersData(): AdditionalFilters {
        const { min, max } = removeDictEmptyFields(this.withdrawalSumFiltersGroup.value);

        return removeDictEmptyFields({
            ...removeDictEmptyFields(this.mainFiltersGroup.value),
            ...removeDictEmptyFields({
                amountFrom: getAmountNum(String(min)),
                amountTo: getAmountNum(String(max)),
            }),
            status: this.statusFilterControl.value,
        });
    }

    private resetFiltersData(): void {
        this.form.reset();
    }
}
