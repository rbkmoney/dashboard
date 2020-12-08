import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StatusModificationUnit } from '@dsh/api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-statuses-filter',
    templateUrl: 'claim-statuses-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimStatusesFilterComponent {
    @Input() selected?: StatusModificationUnit.StatusEnum;
    @Output() selectedChange = new EventEmitter<StatusModificationUnit.StatusEnum>();

    statuses = Object.values(StatusModificationUnit.StatusEnum).filter((i) => i !== 'pendingAcceptance');
}
