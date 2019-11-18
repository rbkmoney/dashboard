import { Component, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { PdlInfoService } from './pdl-info.service';
import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-pdl-info',
    templateUrl: 'pdl-info.component.html'
})
export class PdlInfoComponent implements OnChanges {
    @Input() form;

    isPdlRelationDegreeVisible$ = this.pdlInfoService.isPdlRelationDegreeVisible$;

    constructor(private pdlInfoService: PdlInfoService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges({ form }: SimpleChanges) {
        if (form && form.currentValue) {
            this.pdlInfoService.applyFormValue(form.currentValue.value);
        }
    }

    pdlRelationDegreeChange({ checked }: MatCheckboxChange) {
        this.pdlInfoService.pdlRelationDegreeChange(this.form, checked);
    }
}
