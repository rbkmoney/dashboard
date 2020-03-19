import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RussianIndividualEntity } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-individual-entity-info',
    templateUrl: 'individual-entity-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualEntityInfoComponent {
    @Input() individualEntity: RussianIndividualEntity;
}
