import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Member } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-member',
    templateUrl: 'member.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent {
    @Input() member: Member;

    removeFromOrganization() {}

    editRoles() {}
}
