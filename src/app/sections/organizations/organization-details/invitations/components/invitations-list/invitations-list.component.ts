import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Invitation, Organization } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-invitations-list',
    templateUrl: 'invitations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsListComponent {
    @Input() invitations: Invitation[];
    @Input() orgId: Organization['id'];
    @Input() expandedId: number;
    @Output() changed = new EventEmitter<void>();
    @Output() expandedIdChange = new EventEmitter<number>();
}
