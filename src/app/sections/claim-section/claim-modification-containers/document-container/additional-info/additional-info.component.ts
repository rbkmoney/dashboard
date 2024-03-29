import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash-es/get';

import { AdditionalInfo, WithoutChiefAccountingOrganization } from '@dsh/api-codegen/questionary';

@Component({
    selector: 'dsh-additional-info',
    templateUrl: 'additional-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent implements OnChanges {
    @Input() additionalInfo: AdditionalInfo;

    accountantInfo: WithoutChiefAccountingOrganization;

    ngOnChanges({ additionalInfo }: SimpleChanges) {
        this.accountantInfo = get(additionalInfo, ['currentValue', 'accountantInfo']);
    }
}
