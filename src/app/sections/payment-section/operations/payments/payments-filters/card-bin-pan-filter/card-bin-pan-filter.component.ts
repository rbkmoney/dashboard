import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import isObject from 'lodash-es/isObject';

import { makeMaskedCardEnd, makeMaskedCardStart, splitCardNumber } from '@dsh/app/shared/utils/card-formatter';
import { FilterComponent } from '@dsh/components/filters/filter';
import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';
import { ComponentChanges } from '@dsh/type-utils';

import { CardBinPan } from './types/card-bin-pan';

@UntilDestroy()
@Component({
    selector: 'dsh-card-bin-pan-filter',
    templateUrl: './card-bin-pan-filter.component.html',
    styleUrls: ['./card-bin-pan-filter.component.scss'],
})
export class CardBinPanFilterComponent implements OnChanges {
    @ViewChild(FilterComponent) filter: FilterComponent;

    @Input() binPan: Partial<CardBinPan>;

    @Output() filterChanged = new EventEmitter<Partial<CardBinPan>>();

    form: FormGroup<CardBinPan> = this.formBuilder.group({
        bin: [null, binValidator],
        pan: [null, lastDigitsValidator],
    });

    titleValues: string;
    isActive = false;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: ComponentChanges<CardBinPanFilterComponent>): void {
        if (isObject(changes.binPan)) {
            this.updateFilterForm(changes.binPan.currentValue);
            this.updateBadgePresentation();
        }
    }

    popupOpened(): void {
        this.updateFilterForm(this.binPan);
    }

    popupClosed(): void {
        this.saveFilterData();
    }

    save(): void {
        this.filter.close();
    }

    clear(): void {
        this.clearForm();
    }

    private saveFilterData(): void {
        this.updateBadgePresentation();
        this.filterChanged.emit(this.form.value);
    }

    private updateFilterForm(binPan: Partial<CardBinPan> | undefined): void {
        const { bin = null, pan = null } = binPan ?? {};
        this.form.setValue({
            bin,
            pan,
        });
    }

    private updateBadgePresentation(): void {
        this.updateTitleValues();
        this.updateActiveStatus();
    }

    private updateActiveStatus(): void {
        const { bin, pan } = this.form.value;
        this.isActive = Boolean(bin) || Boolean(pan);
    }

    private updateTitleValues(): void {
        const { bin, pan } = this.form.controls;
        const binString = bin.valid && Boolean(bin.value) ? bin.value : '';
        const panString = pan.valid && Boolean(pan.value) ? pan.value : '';
        const maskedBinPart = makeMaskedCardStart(binString, 12);
        const maskedPanPart = makeMaskedCardEnd(panString, 4);
        const filterValues = splitCardNumber(`${maskedBinPart}${maskedPanPart}`);

        this.titleValues = Boolean(binString) || Boolean(panString) ? `${filterValues}` : '';
    }

    private clearForm(): void {
        this.updateFilterForm({
            bin: null,
            pan: null,
        });
    }
}
