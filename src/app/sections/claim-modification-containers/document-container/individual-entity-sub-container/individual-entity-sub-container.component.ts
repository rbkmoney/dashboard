import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianIndividualEntity } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-individual-entity-sub-container',
    templateUrl: 'individual-entity-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualEntitySubContainerComponent {
    @Input() individualEntity: RussianIndividualEntity;
}
