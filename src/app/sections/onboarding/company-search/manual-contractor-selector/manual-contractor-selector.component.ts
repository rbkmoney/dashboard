import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material';

import { ContractorType } from '../contractor-type';

@Component({
    selector: 'dsh-manual-contractor-selector',
    templateUrl: 'manual-contractor-selector.component.html'
})
export class ManualContractorSelectorComponent implements OnDestroy {
    @Output() selectContractorType: EventEmitter<ContractorType> = new EventEmitter();

    selected(e: MatRadioChange) {
        this.selectContractorType.emit(e.value);
    }

    ngOnDestroy() {
        this.selectContractorType.complete();
    }
}
