import { Component, Input } from '@angular/core';

import { LegalOwnerInfo } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-legal-owner-info',
    templateUrl: 'legal-owner-info.component.html'
})
export class LegalOwnerInfoComponent {
    @Input() legalOwnerInfo: LegalOwnerInfo;
}
