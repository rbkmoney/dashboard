import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { BeneficialOwner, IndividualResidencyInfo } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-beneficial-owner-info',
    templateUrl: 'beneficial-owner-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficialOwnerInfoComponent {
    @Input() beneficialOwner: BeneficialOwner;

    get residencyInfo(): IndividualResidencyInfo {
        return this.beneficialOwner.residencyInfo;
    }
}
