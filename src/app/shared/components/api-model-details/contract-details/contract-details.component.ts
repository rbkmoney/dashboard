import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Contract } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-contract-details',
    templateUrl: 'contract-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractDetailsComponent {
    @Input() contract: Contract;
}
