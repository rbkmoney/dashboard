import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Invitation } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-invitations-list',
    templateUrl: 'invitations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsListComponent {
    @Input() invitations: Invitation[];
    @Input() expandedId: number;
    @Output() expandedIdChange = new EventEmitter<number>();
}
