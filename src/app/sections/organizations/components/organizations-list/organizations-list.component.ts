import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Organization } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsListComponent {
    @Input() organizations: Organization[];
    @Input() expandedId: number;

    @Output() expandedIdChange = new EventEmitter<number>();
}
