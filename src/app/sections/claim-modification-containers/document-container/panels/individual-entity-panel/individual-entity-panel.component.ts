import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianIndividualEntity } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-individual-entity-panel',
    templateUrl: 'individual-entity-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualEntityPanelComponent {
    @Input() individualEntity: RussianIndividualEntity;
}
