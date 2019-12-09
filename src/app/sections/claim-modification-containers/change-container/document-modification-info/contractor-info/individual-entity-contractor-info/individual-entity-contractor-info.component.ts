import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import {
    IndividualEntityContractor,
    RussianIndividualEntity,
    IndividualRegistrationInfo
} from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-individual-entity-contractor-info',
    templateUrl: 'individual-entity-contractor-info.component.html'
})
export class IndividualEntityContractorInfoComponent implements OnChanges {
    @Input() individualEntityContractor: IndividualEntityContractor;

    individualEntity: RussianIndividualEntity;
    registrationInfo: IndividualRegistrationInfo;

    ngOnChanges({ individualEntityContractor }: SimpleChanges) {
        if (individualEntityContractor.currentValue) {
            this.individualEntity = individualEntityContractor.currentValue.individualEntity;
            this.registrationInfo = get(this.individualEntity, ['registrationInfo']);
        }
    }
}
