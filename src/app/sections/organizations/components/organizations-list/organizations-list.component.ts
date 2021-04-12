import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { Organization } from '@dsh/api-codegen/organizations';

import { OrganizationsExpandedIdManager } from '../../services/organizations-expanded-id-manager/organizations-expanded-id-manager.service';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OrganizationsExpandedIdManager],
})
export class OrganizationsListComponent {
    @Input() organizations: Organization[];

    @Output() changed = new EventEmitter<void>();

    expandedId$ = this.expandedIdManager.expandedId$;

    constructor(private expandedIdManager: OrganizationsExpandedIdManager) {}

    trackOrganization(idx: number, item: Organization): string {
        return item.id;
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
