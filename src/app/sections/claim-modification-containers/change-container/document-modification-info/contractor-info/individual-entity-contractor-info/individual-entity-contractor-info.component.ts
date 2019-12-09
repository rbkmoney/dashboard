import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IndividualEntityContractor, IndividualEntity } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-individual-entity-contractor-info',
    templateUrl: 'individual-entity-contractor-info.component.html'
})
export class IndividualEntityContractorInfoComponent implements OnChanges {
    @Input() individualEntityContractor: IndividualEntityContractor;

    individualEntity: IndividualEntity;

    ngOnChanges({ individualEntityContractor }: SimpleChanges) {
        if (individualEntityContractor.currentValue) {
            this.individualEntity = individualEntityContractor.currentValue.individualEntity;
        }
    }
}
