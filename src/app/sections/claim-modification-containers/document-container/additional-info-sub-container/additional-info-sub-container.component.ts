import { Component, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import { AdditionalInfo, WithoutChiefAccountingOrganization } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-additional-info-sub-container',
    templateUrl: 'additional-info-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInfoSubContainerComponent implements OnChanges {
    @Input() additionalInfo: AdditionalInfo;

    accountantInfo: WithoutChiefAccountingOrganization;

    ngOnChanges({ additionalInfo }: SimpleChanges) {
        this.accountantInfo = get(additionalInfo, ['currentValue', 'accountantInfo']);
    }
}
