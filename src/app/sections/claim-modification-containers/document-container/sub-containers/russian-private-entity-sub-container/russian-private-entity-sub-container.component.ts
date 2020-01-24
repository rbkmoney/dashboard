import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianPrivateEntity } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-russian-private-entity-sub-container',
    templateUrl: 'russian-private-entity-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RussianPrivateEntitySubContainerComponent {
    @Input() russianPrivateEntity: RussianPrivateEntity;
}
