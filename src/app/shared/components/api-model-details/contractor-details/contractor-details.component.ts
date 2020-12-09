import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LegalEntity } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-contractor-details',
    templateUrl: 'contractor-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractorDetailsComponent {
    @Input() contractor: LegalEntity;
}
