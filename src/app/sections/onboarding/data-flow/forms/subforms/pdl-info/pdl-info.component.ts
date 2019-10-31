import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { PdlInfoService } from './pdl-info.service';

@Component({
    selector: 'dsh-pdl-info',
    templateUrl: 'pdl-info.component.html'
})
export class PdlInfoComponent {
    layoutGap = '20px';

    @Input() form;

    isPdlRelationDegreeVisible$ = this.pdlInfoService.isPdlRelationDegreeVisible$;

    constructor(private pdlInfoService: PdlInfoService) {}

    pdlRelationDegreeChange({ checked }: MatCheckboxChange) {
        this.pdlInfoService.pdlRelationDegreeChange(this.form, checked);
    }
}
