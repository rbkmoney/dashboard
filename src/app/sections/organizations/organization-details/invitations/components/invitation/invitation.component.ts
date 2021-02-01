import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invitation } from '@dsh/api-codegen/organizations';

@Component({
    selector: 'dsh-invitation',
    templateUrl: 'invitationz.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationComponent {
    @Input() invitation: Invitation;
}
