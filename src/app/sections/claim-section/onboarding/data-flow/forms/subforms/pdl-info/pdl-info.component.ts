import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'dsh-pdl-info',
    templateUrl: 'pdl-info.component.html',
    styleUrls: ['pdl-info.component.scss'],
})
export class PdlInfoComponent implements OnChanges {
    @Input() form: FormGroup;

    isPdlRelationDegreeVisible = false;

    constructor(private fb: FormBuilder) {}

    ngOnChanges({ form }: SimpleChanges) {
        if (form && form.currentValue) {
            this.isPdlRelationDegreeVisible = !!form.currentValue.value.pdlRelationDegree;
        }
    }

    pdlRelationDegreeChange({ checked }: MatCheckboxChange) {
        this.isPdlRelationDegreeVisible = checked;
        this.form.setControl('pdlRelationDegree', this.fb.control('', checked ? Validators.required : null));
    }
}
