import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { PdlInfoService } from './pdl-info.service';

@Component({
    selector: 'dsh-pdl-info',
    templateUrl: 'pdl-info.component.html'
})
export class PdlInfoComponent implements OnChanges {
    layoutGap = '20px';

    @Input() form;

    isPdlRelationDegreeVisible$ = this.pdlInfoService.isPdlRelationDegreeVisible$;

    constructor(private pdlInfoService: PdlInfoService) {}

    ngOnChanges({ form }: SimpleChanges) {
        if (form && form.currentValue) {
            this.pdlInfoService.applyFormValue(form.currentValue.value);
        }
    }

    pdlRelationDegreeChange({ checked }: MatCheckboxChange) {
        this.pdlInfoService.pdlRelationDegreeChange(this.form, checked);
    }
}
