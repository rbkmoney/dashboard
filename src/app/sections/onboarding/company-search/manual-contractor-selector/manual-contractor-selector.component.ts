import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { Contractor } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-manual-contractor-selector',
    templateUrl: 'manual-contractor-selector.component.html',
})
export class ManualContractorSelectorComponent implements OnDestroy {
    @Output() contractorTypeSelected: EventEmitter<Contractor.ContractorTypeEnum> = new EventEmitter();

    selected(e: MatRadioChange) {
        this.contractorTypeSelected.emit(e.value);
    }

    ngOnDestroy() {
        this.contractorTypeSelected.complete();
    }
}
