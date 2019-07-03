import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material';

import { ContractorTypeSelect } from './contractor-type-select';

@Component({
    selector: 'dsh-manual-contractor-selector',
    templateUrl: 'manual-contractor-selector.component.html'
})
export class ManualContractorSelectorComponent implements OnDestroy {
    @Output() selectContractorType: EventEmitter<ContractorTypeSelect> = new EventEmitter();
    dicBasePath = 'sections.onboarding.companySearch.manualContractorSelector';

    selected(e: MatRadioChange) {
        this.selectContractorType.emit(e.value);
    }

    ngOnDestroy() {
        this.selectContractorType.complete();
    }
}
