import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Invitation, Organization } from '@dsh/api-codegen/organizations';

import { InvitationsExpandedIdManager } from '../../services/invitations-expanded-id-manager/invitations-expanded-id-manager.service';

@Component({
    selector: 'dsh-invitations-list',
    templateUrl: 'invitations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsListComponent {
    @Input() invitations: Invitation[];
    @Input() orgId: Organization['id'];

    @Output() changed = new EventEmitter<void>();

    expandedId$ = this.expandedIdManager.expandedId$;

    constructor(private expandedIdManager: InvitationsExpandedIdManager) {}

    trackInvitations(idx: number, item: Invitation): string {
        return item.id;
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
