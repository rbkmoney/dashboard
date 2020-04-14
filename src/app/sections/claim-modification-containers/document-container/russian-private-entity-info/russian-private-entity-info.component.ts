import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RussianPrivateEntity } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-russian-private-entity-info',
    templateUrl: 'russian-private-entity-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RussianPrivateEntityInfoComponent {
    @Input() russianPrivateEntity: RussianPrivateEntity;
}
