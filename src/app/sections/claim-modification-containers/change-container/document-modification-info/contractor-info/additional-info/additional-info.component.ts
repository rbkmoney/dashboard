import { Component, Input } from '@angular/core';

import { AdditionalInfo } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-additional-info',
    templateUrl: 'additional-info.component.html'
})
export class AdditionalInfoComponent {
    @Input() additionalInfo: AdditionalInfo;
}
