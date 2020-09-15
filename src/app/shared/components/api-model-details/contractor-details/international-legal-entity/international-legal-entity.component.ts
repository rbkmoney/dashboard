import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InternationalLegalEntity } from '../../../../../api-codegen/capi';

@Component({
    selector: 'dsh-international-legal-entity',
    templateUrl: 'international-legal-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalLegalEntityComponent {
    @Input() internationalLegalEntity: InternationalLegalEntity;
}
