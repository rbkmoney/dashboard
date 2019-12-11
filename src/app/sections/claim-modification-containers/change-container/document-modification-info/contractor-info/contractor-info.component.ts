import { Component, Input } from '@angular/core';

import { Contractor } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-contractor-info',
    templateUrl: 'contractor-info.component.html'
})
export class ContractorInfoComponent {
    @Input() contractor: Contractor;
}
