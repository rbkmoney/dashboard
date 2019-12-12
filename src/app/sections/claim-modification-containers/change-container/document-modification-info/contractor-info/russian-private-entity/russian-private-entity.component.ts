import { Component, Input } from '@angular/core';

import { RussianPrivateEntity } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-russian-private-entity',
    templateUrl: 'russian-private-entity.component.html'
})
export class RussianPrivateEntityComponent {
    @Input() russianPrivateEntity: RussianPrivateEntity;
}
