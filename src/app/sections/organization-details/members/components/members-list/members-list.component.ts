import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Member, Organization } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-members-list',
    templateUrl: 'members-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent {
    @Input() organization: Organization;
    @Input() members: Member[];
    @Input() expandedId: number;

    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() changed = new EventEmitter<void>();
}
