import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InternationalLegalEntity } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-international-legal-entity-info',
    templateUrl: 'international-legal-entity-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalLegalEntityInfoComponent {
    @Input() internationalLegalEntity: InternationalLegalEntity;
}
