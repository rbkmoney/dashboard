import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';

import { getAbstractControl } from '@dsh/app/shared/utils';
import { formatMajorAmountToStr, getAmountNum } from '@dsh/app/shared/utils/amount-formatters';
import { removeDictEmptyFields } from '@dsh/utils';

import { MainFilters } from '../../main-filters';
import { paymentStatusValidator } from '../../payment-status-filter';
import { PaymentStatusFilterValue } from '../../payment-status-filter/types/payment-status-filter-value';
import { PaymentSumFilter } from '../../payment-sum-filter';
import { PaymentSystemFilterValue } from '../../payment-system-filter/types/payment-system-filter-value';
import { TokenProviderFilterValue } from '../../token-provider-filter/types/token-provider-filter-value';
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
        main: this.formBuilder.group<MainFilters>({
            payerEmail: ['', Validators.email],
            customerID: [''],
            rrn: ['', Validators.pattern(new RegExp(/^\d+$/))],
        }),
        paymentStatus: [null, paymentStatusValidator],
        paymentSum: this.formBuilder.group<PaymentSumFilter>({
            min: [''],
            max: [''],
        }),
        bankCardTokenProvider: [null],
        bankCardPaymentSystem: [null],
    });

    get mainFiltersGroup(): FormGroup<MainFilters> {
        return getAbstractControl<FormGroup<MainFilters>>(this.form, 'main');
    }

    get statusFilterControl(): FormControl<PaymentStatusFilterValue> {
        return getAbstractControl<FormControl<PaymentStatusFilterValue>>(this.form, 'paymentStatus');
    }

    get paymentSumFiltersGroup(): FormGroup<PaymentSumFilter> {
        return getAbstractControl<FormGroup<PaymentSumFilter>>(this.form, 'paymentSum');
    }

    get tokenProviderFilterControl(): FormControl<TokenProviderFilterValue> {
        return getAbstractControl<FormControl<TokenProviderFilterValue>>(this.form, 'bankCardTokenProvider');
    }

    get paymentSystemFilterControl(): FormControl<PaymentSystemFilterValue> {
        return getAbstractControl<FormControl<PaymentSystemFilterValue>>(this.form, 'bankCardPaymentSystem');
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder
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
            payerEmail = '',
            customerID = '',
            rrn = '',
            paymentStatus = null,
            paymentAmountFrom = null,
            paymentAmountTo = null,
            bankCardTokenProvider = null,
            bankCardPaymentSystem = null,
        } = this.data;
        return {
            main: {
                payerEmail,
                customerID,
                rrn,
            },
            paymentStatus,
            paymentSum: {
                min: formatMajorAmountToStr(paymentAmountFrom),
                max: formatMajorAmountToStr(paymentAmountTo),
            },
            bankCardTokenProvider,
            bankCardPaymentSystem,
        };
    }

    private getFiltersData(): AdditionalFilters {
        const { min, max } = this.extractGroupValidFields(this.paymentSumFiltersGroup);

        return removeDictEmptyFields({
            ...this.extractGroupValidFields(this.mainFiltersGroup),
            ...removeDictEmptyFields({
                paymentAmountFrom: getAmountNum(String(min)),
                paymentAmountTo: getAmountNum(String(max)),
            }),
            paymentStatus: this.statusFilterControl.value,
            bankCardTokenProvider: this.tokenProviderFilterControl.value,
            bankCardPaymentSystem: this.paymentSystemFilterControl.value,
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
        this.form.reset();
        // this.mainFiltersGroup.reset();
        // this.statusFilterControl.reset();
        // this.paymentSumFiltersGroup.reset();
    }
}
