import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Member } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-members-list',
    templateUrl: 'members-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent {
    @Input() members: Member[];
    @Input() expandedId: number;
    @Output() expandedIdChange = new EventEmitter<number>();
}
