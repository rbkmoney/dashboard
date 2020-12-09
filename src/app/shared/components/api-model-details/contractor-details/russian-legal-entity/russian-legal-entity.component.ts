import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RussianLegalEntity } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-russian-legal-entity',
    templateUrl: 'russian-legal-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RussianLegalEntityComponent {
    @Input() russianLegalEntity: RussianLegalEntity;
}
