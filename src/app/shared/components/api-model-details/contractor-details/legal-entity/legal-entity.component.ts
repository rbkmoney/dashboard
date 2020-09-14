import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InternationalLegalEntity, RussianLegalEntity } from '../../../../../api-codegen/capi';

@Component({
    selector: 'dsh-legal-entity',
    templateUrl: 'legal-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalEntityComponent {
    @Input() legalEntity: RussianLegalEntity | InternationalLegalEntity;
}
