import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LegalEntityContractor, LegalEntity } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-legal-entity-contractor-info',
    templateUrl: 'legal-entity-contractor-info.component.html'
})
export class LegalEntityContractorInfoComponent implements OnChanges {
    @Input() legalEntityContractor: LegalEntityContractor;

    legalEntity: LegalEntity;

    ngOnChanges({ legalEntityContractor }: SimpleChanges) {
        if (legalEntityContractor.currentValue) {
            this.legalEntity = legalEntityContractor.currentValue.legalEntity;
        }
    }
}
