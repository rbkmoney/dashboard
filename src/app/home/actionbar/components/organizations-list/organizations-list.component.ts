import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsListComponent {
    @Output() selected = new EventEmitter<void>();

    orgs$ = this.organizationsService.listOrgMembership(3).pipe(shareReplay(1));

    constructor(private organizationsService: OrganizationsService) {}
}
