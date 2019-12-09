import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import {
    LegalEntityContractor,
    RussianLegalEntity,
    LegalRegistrationInfo
} from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-legal-entity-contractor-info',
    templateUrl: 'legal-entity-contractor-info.component.html'
})
export class LegalEntityContractorInfoComponent implements OnChanges {
    @Input() legalEntityContractor: LegalEntityContractor;

    legalEntity: RussianLegalEntity;
    registrationInfo: LegalRegistrationInfo;

    ngOnChanges({ legalEntityContractor }: SimpleChanges) {
        if (legalEntityContractor.currentValue) {
            this.legalEntity = legalEntityContractor.currentValue.legalEntity;
            this.registrationInfo = get(this.legalEntity, ['registrationInfo']);
        }
    }
}
