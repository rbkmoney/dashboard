import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import isObject from 'lodash.isobject';

import { FilterComponent } from '@dsh/components/filters/filter';
import { ComponentChanges } from '@dsh/type-utils';

import { BIN_LENGTH, PAN_LENGTH } from './consts';
import { CardBinPan } from './types/card-bin-pan';

@UntilDestroy()
@Component({
    selector: 'dsh-card-bin-pan-filter',
    templateUrl: './card-bin-pan-filter.component.html',
})
export class CardBinPanFilterComponent implements OnChanges {
    @ViewChild(FilterComponent) filter: FilterComponent;

    @Input() binPan: Partial<CardBinPan>;

    @Output() filterChanged = new EventEmitter<Partial<CardBinPan>>();

    form: FormGroup<CardBinPan> = this.formBuilder.group({
        bin: [null, Validators.minLength(BIN_LENGTH)],
        pan: [null, Validators.minLength(PAN_LENGTH)],
    });

    titleValues: string;
    isActive = false;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: ComponentChanges<CardBinPanFilterComponent>): void {
        if (isObject(changes.binPan)) {
            this.updateFilterData();
            this.updateTitleValues();
            this.updateActiveStatus();
        }
    }

    onOpened(): void {
        this.updateFilterData();
    }

    onClosed(): void {
        this.saveFilterData();
    }

    onSave(): void {
        this.filter.close();
    }

    onClear(): void {
        this.clearForm();
    }

    private saveFilterData(): void {
        const cardBinPan = this.form.value;
        this.updateTitleValues();
        this.updateActiveStatus();
        this.filterChanged.emit(cardBinPan);
    }

    private updateFilterData(): void {
        const { bin = null, pan = null } = this.binPan ?? {};
        this.form.setValue({
            bin,
            pan,
        });
    }

    private updateActiveStatus(): void {
        const { bin, pan } = this.form.value;
        this.isActive = Boolean(bin) || Boolean(pan);
    }

    private updateTitleValues(): void {
        const { bin, pan } = this.form.controls;
        const binString = bin.valid && bin.value ? bin.value : '';
        const panString = pan.valid && pan.value ? pan.value : '';
        const maskedBinPart = binString.padEnd(6, '*');
        const maskedPanPart = panString.padStart(4, '*');
        const filterValues = `${maskedBinPart.slice(0, 4)} ${maskedBinPart.slice(4)}** **** ${maskedPanPart}`;

        this.titleValues = Boolean(bin) || Boolean(pan) ? `${filterValues}` : '';
    }

    private clearForm(): void {
        this.form.setValue({
            bin: null,
            pan: null,
        });
    }
}
