import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { OrganizationMembership } from '../../../../api-codegen/organizations';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsListComponent {
    @Input() organizations: OrganizationMembership[];
    @Input() expandedId: number;

    @Output() expandedIdChange = new EventEmitter<number>();
}
