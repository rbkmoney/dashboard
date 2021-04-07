import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Member, Organization } from '@dsh/api-codegen/organizations';

import { MembersExpandedIdManager } from '../../services/members-expanded-id-manager/members-expanded-id-manager.service';

@Component({
    selector: 'dsh-members-list',
    templateUrl: 'members-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent {
    @Input() organization: Organization;
    @Input() members: Member[];

    @Output() changed = new EventEmitter<void>();

    expandedId$ = this.expandedIdManager.expandedId$;

    constructor(private expandedIdManager: MembersExpandedIdManager) {}

    trackMembers(idx: number, item: Member): string {
        return item.id;
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
